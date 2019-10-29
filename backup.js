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
import moment from "moment";
let realm;
var dependentSessionIds = [];
var dependingQues = [];
var statementArray = [];
var getHiddenArray = [];
var formattedArray = [];
var removingIds = [];
// var uri =
//   "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5B0%5D%5Bid%5D=96f782b2-34a8-1398-ea37-6db618c62171%7C%7C88327ada-4428-f1bb-86ef-654c6ee3102d&forms%5B0%5D%5Bversion%5D=-1.12";
var uri =
  "https://bbymakeitright.nalgroup.com/app/service/mobile/?request=RetrieveForms&forms%5b0%5d%5bid%5d=96f782b2-34a8-1398-ea37-6db618c62171%7C%7Cd870f9a1-3407-0488-bb20-526f4083b036&forms%5b0%5d%5bversion%5d=-1.12";

export default class Sample extends React.Component {
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
    this.getSortingArray = {};
    this.onDropdownValue = this.onDropdownValue.bind(this);
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
              let sections = responseData.forms[0][0].panel[0].section;
              sections.map((sectionObject, i) => {
                sectionObject.blocks.map((blockObject, k) => {
                  formattedArray.push({
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
              this.onRemovingDependency(formattedArray);
            }
          );
          // this.onChanging(responseData);
        } else {
          this.setState({
            array: []
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
    // console.log("FORMATEEDDD#####", sortingDependencyArray);
    // this.setState({
    //   getArray: sortingDependencyArray
    // });
    this.getSortingArray = sortingDependencyArray;
    this.onRemovingDependencyQues(sortingDependencyArray);
  }
  onRemovingDependencyQues(updatedArray) {
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
    // console.log("FORMATEEDDD#####", UniqueIds);
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
    // console.log("FORMATEEDDD#####", getUpdatedArray);
    getUpdatedArray.map((result, k) => {
      if (!result.hidden) {
        getHiddenArray.push(result);
      }
    });
    console.log("FORMATEEDDD#####", statementArray.concat(getHiddenArray));
    this.setState({
      getFinalArray: statementArray.concat(getHiddenArray),
      spinner: false
    });
  }
  onCheck(item) {
    const { array } = this.state;
    var appendingArray = [];
    // alert(JSON.stringify(item));
    //  alert(JSON.stringify(item));

    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      () => {
        if (this.state.isChecked) {
          if (item.block.question && item.block.question.dependent_section) {
            var id = item.block.question.dependent_section[0].section_id;
            const newData = this.arrayholder.filter(item => {
              const itemData = `${item.section_id}`;
              return itemData.indexOf(id) > -1;
            });

            newData.map((sectionObj, key) => {
              sectionObj.blocks.map((blockObject, k) => {
                appendingArray.push({
                  section_id: sectionObj.section_id,
                  is_repeatable: sectionObj.is_repeatable,
                  hidden: sectionObj.hidden,
                  position: sectionObj.position,
                  answer: "",
                  block: blockObject
                });
              });
            });

            var addingArray = appendingArray.concat(this.state.getFinalArray);
            var sortedArray = addingArray.sort(function(a, b) {
              return a.position - b.position;
            });
            console.log("adfnewDatahgdfd", sortedArray);
            this.setState({
              getFinalArray: sortedArray
            });
            // this.state.sectionsArray.splice(index, 0, newData[0]);
          }
        } else {
          // this.unCheckingItem(item);
        }
      }
    );
  }
  unCheckingItem(item) {
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
    // console.log("mbmnbvnbmcvnbcvtrtert", sortingDependencyArray);
    this.setState({
      getFinalArray: sortingDependencyArray
    });
  }
  onDropdownValue(value, item) {
    if (item.block.question && item.block.question.depending_questions) {
      if (item.block.question.depending_questions[0].answer === value) {
        console.log(
          "mnbrerwrewe",
          item.block.question.depending_questions[0].answer
        );
        var id = item.block.question.depending_questions[0].key[0];

        const newData = this.getSortingArray.filter(blockObj => {
          if (blockObj.block.question) {
            if (
              blockObj.block.question.prompt === blockObj.block.question.key[1]
            ) {
              const itemData = `${blockObj.block.question.key[0]}`;
              return itemData.indexOf(id) > -1;
            }
          }
        });
        // var addingArray = newData.concat(this.state.getFinalArray);
        var addingArray = newData.concat(this.state.getFinalArray);
        var sortedArray = addingArray.sort(function(a, b) {
          return a.block.block_pos - b.block.block_pos;
        });
        console.log("adfnewDatahgdfd", addingArray);
      }
    }
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
        onDropdownValue={this.onDropdownValue}
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
          {/*<TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
            <Text>GET DATA</Text>
          </TouchableOpacity>*/}
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
