import React from "react";
import {
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import ListData from "@ListData";
import Mytext from "@Text";
import Realm from "realm";
let realm;
var dependentSessionIds = [];
var dependingQues = [];
var statementArray = [];
var getHiddenArray = [];
// var uri =
//   "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5B0%5D%5Bid%5D=96f782b2-34a8-1398-ea37-6db618c62171%7C%7C88327ada-4428-f1bb-86ef-654c6ee3102d&forms%5B0%5D%5Bversion%5D=-1.12";
var uri =
  "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5b0%5d%5bid%5d=96f782b2-34a8-1398-ea37-6db618c62171%7C%7Cd870f9a1-3407-0488-bb20-526f4083b036&forms%5b0%5d%5bversion%5d=-1.12";
// const CitiesSchema = {
//   name: "Cities",
//   primaryKey: "string",
//   properties: {
//     name: {
//       type: "string"
//     },
//     pincode: {
//       type: "int"
//     }
//   }
//   // block_type: "string",
//   // block_pos: "string"
// };
//
// const SectionsSchema = {
//   name: "Sections",
//   section_id: "id",
//   is_repeatable: { type: "bool", default: false },
//   hidden: { type: "bool", default: false },
//   position: "string",
//   blocks: {
//     type: "list",
//     objectType: "Cities"
//   }
// };
//
// const schemaList = [SectionsSchema, CitiesSchema];
// const realm = new Realm({ schema: schemaList });

export default class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      spinner: true,
      finalArray: [],
      sectionsArray: [],
      isChecked: false,
      dependingQuestionsArray: [],
      getFinalArray: [],
      mainArray: null
    };
    this.arrayholder = {};
    // this.onCheck = this.onCheck.bind(this);
    realm = new Realm({ path: "FormDatabase.realm" });
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.forms[0][0].panel) {
          this.setState(
            {
              array: responseData.forms[0][0].panel[0].section,
              mainArray: responseData
            },
            () => {
              this.arrayholder = this.state.array;
              // var formData = {
              //   value: this.state.array
              // };
              // realm.write(() => {
              //   realm.create("form_details", {
              //     form_id: responseData.forms[0][0].form_id,
              //     form_name: responseData.forms[0][0].form_name,
              //     form: JSON.stringify(this.state.array)
              //   });
              // });
            }
          );
          this.onChanging(responseData);
        } else {
          this.setState({
            array: [],
            spinner: false
          });
          // alert("else");
        }
      })
      .catch(err => {
        this.setState({
          array: [],
          spinner: false
        });
        alert(err);
      });
  }
  onChanging(responseData) {
    let sections = responseData.forms[0][0].panel[0].section;
    sections &&
      sections.map((sectionObj, key) => {
        sectionObj.blocks &&
          sectionObj.blocks.map((block, key) => {
            if (block.block_type === "question") {
              block.question.dependent_section &&
                block.question.dependent_section.map((quest, key) => {
                  dependentSessionIds.push(quest.section_id);
                });
            }
          });
      });
    let UniqueSessionIds =
      dependentSessionIds &&
      dependentSessionIds.filter((v, i, a) => a.indexOf(v) === i);
    // console.log("DFDSFDSFDF", UniqueSessionIds);

    let finalArray = sections.filter(function(el) {
      return UniqueSessionIds.indexOf(el.section_id) < 0;
    });

    this.setState({
      sectionsArray: finalArray
    });
    var formattedArray = [];
    finalArray.map((sectionObject, i) => {
      sectionObject.blocks.map((blockObject, k) => {
        formattedArray.push({
          section_id: sectionObject.section_id,
          is_repeatable: sectionObject.section_id,
          hidden: sectionObject.hidden,
          position: sectionObject.position,
          answer: "",
          block: blockObject
        });
      });
    });
    this.setState({
      dependingQuestionsArray: formattedArray
    });
    this.formatting(formattedArray);
  }
  formatting(updatedArray) {
    updatedArray.map((obj, key) => {
      if (obj.block.statement) {
        statementArray.push(obj);
      }
      if (obj.block.question && obj.block.question.depending_questions) {
        if (obj.block.question.depending_questions[0].key) {
          dependingQues.push(obj.block.question.depending_questions[0].key[0]);
        }
      }
    });
    let UniqueIds =
      dependingQues && dependingQues.filter((v, i, a) => a.indexOf(v) === i);

    let getUpdatedArray = updatedArray.filter(function(value) {
      if (value.block.question) {
        return (
          UniqueIds.indexOf(
            value.block.question.key[0] &&
              value.block.question.prompt === value.block.question.key[1]
          ) < 0
        );
      }
    });
    console.log("FORMATEEDDD#####", getUpdatedArray);
    getUpdatedArray.map((result, k) => {
      if (!result.block.question.hidden) {
        getHiddenArray.push(result);
      }
    });
    this.setState(
      {
        getFinalArray: statementArray.concat(getHiddenArray),
        spinner: false
      },
      () => {
        // console.log("myutguyghjb", this.state.getFinalArray);

        realm.write(() => {
          realm.create("form_details", {
            form_id: this.state.mainArray.forms[0][0].form_id,
            form_name: this.state.mainArray.forms[0][0].form_name,
            form: JSON.stringify(this.state.getFinalArray)
          });
        });
      }
    );
  }

  onCheck(item) {
    const { array } = this.state;
    // alert(JSON.stringify(item));
    //  alert(JSON.stringify(item));
    if (item.block.question && item.block.question.dependent_section) {
      var id = item.block.question.dependent_section[0].section_id;
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.section_id}`;
        return itemData.indexOf(id) > -1;
      });

      // this.setState({ subData: newData });
      console.log("adfnewDatahgdfd", newData[0]);
      // this.state.sectionsArray.splice(index, 0, newData[0]);
    }

    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      () => {
        // arr.splice(index, 0, item);
      }
    );
  }
  renderItem = ({ item, index }) => {
    const { array, isChecked } = this.state;

    return (
      <ListData
        item={item}
        index={index}
        navigation={this.props.navigation}
        array={this.state.array}
        onCheckingItem={() => this.onCheck(item)}
        isChecked={isChecked}
      />
    );
  };
  render() {
    const {
      array,
      spinner,
      sectionsArray,
      getFinalArray,
      isChecked
    } = this.state;

    if (spinner) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
            <Text>GET DATA</Text>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={getFinalArray}
              renderItem={this.renderItem}
              keyExtractor={({ item, index }) => index}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
// <ListData
//   item={res}
//   index={key}
//   navigation={this.props.navigation}
//   array={this.state.array}
//   onCheckingItem={this.onCheck}
//   isChecked={isChecked}
// />
