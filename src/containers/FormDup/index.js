import React from "react";
import {
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { Content } from "native-base";
import ListData from "@ListData";
import Mytext from "@Text";
import Realm from "realm";
import Queries from "@AppUtils";
import Button from "@Button";
let realm;
var dependentSessionIds = [];
var dependingQues = [];
var statementArray = [];
var getHiddenArray = [];
var formattedArray = [];
var removingIds = [];
var removingDependencyIds = [];
var removingDropdownValues = [];
var addingEntries = [];
// var uri =
//   "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5B0%5D%5Bid%5D=96f782b2-34a8-1398-ea37-6db618c62171%7C%7C88327ada-4428-f1bb-86ef-654c6ee3102d&forms%5B0%5D%5Bversion%5D=-1.12";
var uri =
  "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5b0%5d%5bid%5d=96f782b2-34a8-1398-ea37-6db618c62171%7C%7Cd870f9a1-3407-0488-bb20-526f4083b036&forms%5b0%5d%5bversion%5d=-1.12";

export default class FormDup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      spinner: true,
      finalArray: [],
      sectionsArray: [],
      isChecked: "No",
      dependingQuestionsArray: [],
      getFinalArray: [],
      mainArray: null,
      textInputValue: "",
      addingButtonDisplay: null,
      removingEntry: null
    };
    this.arrayholder = {};
    this.getSortingArray = {};
  }
  componentDidMount() {
    this.fetchData();
  }
  fetching() {
    Queries.getData().then(response => {
      console.log("ajshdgj", response);
    });
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
              this.onRemovingDependency(responseData);
            }
          );
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
  onRemovingDependency(responseData) {
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

    let finalArray = sections.filter(function(el) {
      return UniqueSessionIds.indexOf(el.section_id) < 0;
    });

    // this.setState({
    //   sectionsArray: finalArray
    // });
    // var formattedArray = [];
    // finalArray.map((sectionObject, i) => {
    //   sectionObject.blocks.map((blockObject, k) => {
    //     formattedArray.push({
    //       section_id: sectionObject.section_id,
    //       is_repeatable: sectionObject.is_repeatable,
    //       hidden: sectionObject.hidden,
    //       position: sectionObject.position,
    //       answer: "",
    //       block: blockObject
    //     });
    //   });
    // });
    // this.setState({
    //   dependingQuestionsArray: formattedArray
    // });
    // console.log("bnjgajhjfghjfg", formattedArray);
    this.onRemovingDependencyQues(finalArray);
  }
  onRemovingDependencyQues(updatedArray) {
    let sections = updatedArray;
    sections &&
      sections.map((sectionObj, key) => {
        sectionObj.blocks &&
          sectionObj.blocks.map((block, key) => {
            if (block.block_type === "question") {
              block.question.depending_questions &&
                block.question.depending_questions.map((response, key) => {
                  dependingQues.push(response.key[0]);
                });
            }
          });
      });
    let UniqueIds =
      dependingQues && dependingQues.filter((v, i, a) => a.indexOf(v) === i);
    let filteringQues = sections.filter(function(sectionObj) {
      // sections.map((sectionObj, k) => {
      sectionObj.blocks.map((blockObj, i) => {
        if (blockObj.block_type === "question") {
          // if (
          //   blockObj.question.key[1] &&
          //   blockObj.question.key[1] === "notes"
          // ) {
          console.log(
            "nmnmnmnmnnnnmnmnn",
            UniqueIds.indexOf(blockObj.question.key) < 0
          );
          // return UniqueIds.indexOf(blockObj.question.key) < 0;
          // }else {
          //
          // }

          // return sectionsvalue === blockObj.question.key;
          // if (
          //   blockObj.question.key[0] != value[0] &&
          //   blockObj.question.key[1] != value[1]
          // ) {
          //
          // }
        }
      });
      // });
    });
    // console.log("nmnmnmnmnnnnmnmnn", filteringQues);
  }

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
          {/*<TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
            <Text>GET DATA</Text>
          </TouchableOpacity>*/}
          <Content showsVerticalScrollIndicator={false} extraScrollHeight={100}>
            {/*<FlatList
              data={this.state.getFinalArray}
              renderItem={this.renderItem}
              keyExtractor={({ item, index }) => index}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
            />*/}
            <View style={{ alignItems: "center" }}>
              <Button title="Save" customClick={this.onSave} />
            </View>
          </Content>
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
