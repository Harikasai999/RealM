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

export default class Form extends React.Component {
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
    // this.getFormattedArray = {};
    this.onDropdownValue = this.onDropdownValue.bind(this);
    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    this.onSave = this.onSave.bind(this);
    realm = new Realm({ path: "FormDatabase.realm" });
  }
  componentDidMount() {
    this.fetchData();
    //this.fetching()
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
              // this.arrayholder = this.state.array;
              // var objectId =
              //   "_" +
              //   Math.random()
              //     .toString(36)
              //     .substr(2, 9);
              let sections = responseData.forms[0][0].panel[0].section;
              sections.map((sectionObject, i) => {
                sectionObject.blocks.map((blockObject, k) => {
                  formattedArray.push({
                    // objectId: objectId,
                    section_id: sectionObject.section_id,
                    is_repeatable: sectionObject.is_repeatable,
                    hidden: sectionObject.hidden,
                    position: sectionObject.position,
                    answer: "",
                    block: blockObject
                  });
                });
              });

              // this.setState({
              //   dependingQuestionsArray: formattedArray
              // });
              // this.arrayholder = formattedArray;
              this.arrayholder = formattedArray;
              // console.log("adkjhjkdsfhjkdsfhdhf", formattedArray);
              this.onRemovingDependency(formattedArray);

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
          // this.onChanging(responseData);
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
    let sections = responseData;

    sections.map((result, key) => {
      if (result.block.block_type === "question") {
        result.block.question.dependent_section &&
          result.block.question.dependent_section.map((quest, key) => {
            dependentSessionIds.push(quest.section_id);
          });
      }
    });
    let UniqueSessionIds =
      dependentSessionIds &&
      dependentSessionIds.filter((v, i, a) => a.indexOf(v) === i);

    let sortingDependencyArray = sections.filter(function(el) {
      return UniqueSessionIds.indexOf(el.section_id) < 0;
    });
    this.onRemovingDependencyQues(sortingDependencyArray);
    this.getSortingArray = sortingDependencyArray;
  }
  onRemovingDependencyQues(updatedArray) {
    updatedArray.map((obj, key) => {
      if (obj.block.statement) {
        statementArray.push(obj);
      }
      if (obj.block.question && obj.block.question.depending_questions) {
        if (obj.block.question.depending_questions[0].key) {
          // dependingQues.push({keyValue:obj.block.question.depending_questions[0].key[0],keyNotes:obj.block.question.depending_questions[0].key[1]});
          dependingQues.push(obj.block.question.depending_questions[0].key);
        }
      }
    });
    let UniqueIds =
      dependingQues && dependingQues.filter((v, i, a) => a.indexOf(v) === i);
    //  console.log("FORMATEEDDD#####", UniqueIds);
    var sortingDependencyQuestion = [];
    let getUpdatedArray = UniqueIds.filter(function(value) {
      updatedArray.map((keys, i) => {
        if (keys.block.question) {
          if (
            keys.block.question.key[0] != value[0] &&
            keys.block.question.key[1] != value[1]
          ) {
            sortingDependencyQuestion.push(keys);
          }
        }
      });
    });
    const uniqueArray = sortingDependencyQuestion.filter((uniqueObj, index) => {
      return (
        index ===
        sortingDependencyQuestion.findIndex(obj => {
          return JSON.stringify(obj) === JSON.stringify(uniqueObj);
        })
      );
    });

    uniqueArray.map((result, k) => {
      if (!result.block.question.hidden) {
        getHiddenArray.push(result);
      }
    });
    var combineArray = statementArray.concat(getHiddenArray);
    var sortedArray = combineArray.sort(function(a, b) {
      return a.position - b.position;
    });
    this.setState(
      {
        getFinalArray: sortedArray,
        spinner: false
      },
      () => {
        // console.log("FORMATEEDDD#####", this.state.getFinalArray);
      }
    );
  }

  onCheck(item) {
    if (item.answer === "Yes") {
      this.unCheckingItem(item);
    } else {
      this.onChecking(item);
    }
  }
  onChecking(item) {
    const { array } = this.state;
    var appendingArray = [];
    item.answer = "Yes";

    this.setState({
      isChecked: "Yes"
    });
    if (item.block.question && item.block.question.dependent_section) {
      var id = item.block.question.dependent_section[0].section_id;

      const newData = this.arrayholder.filter(obj => {
        const sectionId = `${obj.section_id}`;
        return sectionId.indexOf(id) > -1;
      });
      //console.log("sjdfghhjghjfgfg", newData);
      var addingUniqueId =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      this.setState({
        addingButtonDisplay: addingUniqueId
        // arrayLength: newData.length
        // removingEntry: addingUniqueId
      });

      var data = newData;
      data.map((obj, k) => {
        obj.answer = "";
        obj.iteration = 0;
        obj.uniqueId = addingUniqueId;
        // obj.removingUniqueId = addingUniqueId;
      });
      addingEntries.push({ entriesList: data });

      var addingArray = data.concat(this.state.getFinalArray);
      var sortedArray = addingArray.sort(function(a, b) {
        return a.position - b.position;
      });
      // console.log("adfnewDatahgdfd", sortedArray);
      this.setState({
        getFinalArray: sortedArray
      });
    }
  }
  unCheckingItem(item) {
    item.answer = "No";
    this.setState({
      isChecked: "No"
    });
    let removingItems = this.state.getFinalArray;
    removingItems.map((result, key) => {
      if (item.block.question && item.block.question.dependent_section) {
        var id = item.block.question.dependent_section[0].section_id;
        if (result.section_id === id) {
          removingIds.push(result.section_id);
        }
      }
    });

    let UniqueSessionIds =
      removingIds && removingIds.filter((v, i, a) => a.indexOf(v) === i);

    let sortingDependencyArray = removingItems.filter(function(el) {
      return UniqueSessionIds.indexOf(el.section_id) < 0;
    });

    this.setState({
      getFinalArray: sortingDependencyArray
    });
  }
  onDropdownValue(value, item, index) {
    item.answer = value;
    this.addingDependencyQuestion(value, item, index);
  }
  addingDependencyQuestion(value, item, index) {
    var newArray = [];
    var dropdownArray = this.state.getFinalArray;
    if (item.block.question && item.block.question.depending_questions) {
      if (item.block.question.depending_questions[0].answer === value) {
        var id = item.block.question.depending_questions[0].key;

        const newData = this.getSortingArray.filter(blockObj => {
          if (blockObj.block.question) {
            const itemData = `${blockObj.block.question.key}`;
            return itemData.indexOf(id) > -1;
          }
        });

        dropdownArray.splice(index + 1, 0, newData[0]);
        this.setState(
          {
            getFinalArray: dropdownArray
          },
          () => {
            this.addingDependentSection(value, item, index);
          }
        );
      } else {
        if (item.block.question.depending_questions) {
          this.state.getFinalArray.map((res, key) => {
            if (res.block.question) {
              if (
                item.block.question.depending_questions[0].key[0] ===
                  res.block.question.key[0] &&
                item.block.question.depending_questions[0].key[1] ===
                  res.block.question.key[1]
              ) {
                dropdownArray.splice(key, 1);
                this.setState(
                  {
                    getFinalArray: dropdownArray
                  },
                  () => {
                    this.addingDependentSection(value, item, index);
                  }
                );
              }
            }
          });
        }
      }
    }
  }
  addingDependentSection(value, item, index) {
    var addingDependentSectionArray = [];
    var dropdownArray = this.state.getFinalArray;
    if (item.block.question && item.block.question.dependent_section) {
      if (item.block.question.dependent_section[0].answer === value) {
        var id = item.block.question.dependent_section[0].section_id;

        const newData = this.arrayholder.filter(section => {
          const itemData = `${section.section_id}`;
          return itemData.indexOf(id) > -1;
        });
        var data = newData;
        data.map((obj, k) => {
          obj.answer = "";
        });

        var addingArray = data.concat(this.state.getFinalArray);
        var sortedArray = addingArray.sort(function(a, b) {
          return a.position - b.position;
        });
        const uniqueArray = sortedArray.filter((uniqueObj, index) => {
          return (
            index ===
            sortedArray.findIndex(obj => {
              return JSON.stringify(obj) === JSON.stringify(uniqueObj);
            })
          );
        });
        this.setState({
          getFinalArray: uniqueArray
        });
      } else {
        this.removingDependencySection(item);
      }
    }
  }
  removingDependencySection(item) {
    let removingItems = this.state.getFinalArray;
    var sortingDependencyArray = [];
    var removingArray = [];
    removingItems.map((result, key) => {
      if (item.block.question && item.block.question.dependent_section) {
        var id = item.block.question.dependent_section[0].section_id;
        if (result.section_id === id) {
          removingDependencyIds.push(result.section_id);
        }
      }
    });

    let UniqueSessionIds =
      removingDependencyIds &&
      removingDependencyIds.filter((v, i, a) => a.indexOf(v) === i);
    if (UniqueSessionIds.length > 0) {
      this.state.getFinalArray.map((res, key) => {
        if (res.block.question && res.block.question.dependent_section) {
          if (res.block.question.dependent_section[0].answer === res.answer) {
            removingArray.push(res);
          }
        }
      });
    }

    if (removingArray.length > 0) {
      sortingDependencyArray = removingItems;
    } else {
      sortingDependencyArray = removingItems.filter(function(el) {
        return UniqueSessionIds.indexOf(el.section_id) < 0;
      });
    }
    this.setState({
      getFinalArray: sortingDependencyArray
    });
  }

  addAdditionalEntry(item) {
    var id = item.section_id;
    // console.log("aghsdhghggretrtrt", this.arrayholder);
    const newData = this.arrayholder.filter(obj => {
      const sectionId = `${obj.section_id}`;
      return sectionId.indexOf(id) > -1;
    });
    var addingUniqueId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    var data = newData;
    this.setState({
      addingButtonDisplay: addingUniqueId
      // removingEntry: addingUniqueId
    });
    data.map((obj, k) => {
      obj.answer = "";
      obj.iteration = obj.iteration + 1;
      obj.uniqueId = addingUniqueId;
      // obj.removingUniqueId = addingUniqueId;
    });
    // console.log("ajiuyeruieyruiewy", data);
    addingEntries.push({ entriesList: data });
    console.log("sjdfghhjghjfgfg", addingEntries.length);
    var addingArray = data.concat(this.state.getFinalArray);
    var sortedArray = addingArray.sort(function(a, b) {
      return a.position - b.position;
    });

    this.setState({
      getFinalArray: sortedArray
    });
  }
  removeAdditionalEntry(item) {
    alert("asjdghjdg" + item.uniqueId);
  }
  onChangeTextInput(text, item) {
    // item.answer = text;

    let setTextInputs = this.state.getFinalArray.filter(function(obj) {
      if (obj.block.question && obj.block.question.key) {
        if (item.block.question.key[0] === obj.block.question.key[0])
          return (item.answer = text);
      }
    });
    // console.log("ajfghaf34234234ghagf", this.state.getFinalArray);
    // this.setState({
    //   textInputValue: text
    // });
  }
  onSave() {
    console.log("dfjgs3434343dfds", this.state.getFinalArray);
  }
  renderItem = ({ item, index }) => {
    const { array, textInputValue } = this.state;

    return (
      <View>
        <ListData
          item={item}
          index={index}
          navigation={this.props.navigation}
          array={this.state.array}
          getFinalArray={this.state.getFinalArray}
          onCheckingItem={() => this.onCheck(item)}
          onDropdownValue={this.onDropdownValue}
          onChangeTextInput={this.onChangeTextInput}
          addAdditionalEntry={() => this.addAdditionalEntry(item)}
          removeAdditionalEntry={() => this.removeAdditionalEntry(item)}
          addingButtonDisplay={this.state.addingButtonDisplay}
          addingEntriesLength={addingEntries.length}
          // textInputValue={textInputValue}
        />
      </View>
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
          {/*<TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
            <Text>GET DATA</Text>
          </TouchableOpacity>*/}
          <Content showsVerticalScrollIndicator={false} extraScrollHeight={100}>
            <FlatList
              data={getFinalArray}
              renderItem={this.renderItem}
              keyExtractor={({ item, index }) => index}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
            />
            {/* <ScrollView>
              {getFinalArray.map((res, key) => {
                return (
                  <View key={key}>
                    <ListData
                      item={res}
                      index={key}
                      navigation={this.props.navigation}
                      array={this.state.array}
                      getFinalArray={this.state.getFinalArray}
                      onCheckingItem={() => this.onCheck(res)}
                      onDropdownValue={this.onDropdownValue}
                      onChangeTextInput={this.onChangeTextInput}
                      addAdditionalEntry={() => this.addAdditionalEntry(res)}
                      removeAdditionalEntry={() =>
                        this.removeAdditionalEntry(res)
                      }
                      addingButtonDisplay={this.state.addingButtonDisplay}
                      addingEntriesLength={addingEntries.length}
                      // textInputValue={textInputValue}
                    />
                  </View>
                );
              })}
            </ScrollView>*/}
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
