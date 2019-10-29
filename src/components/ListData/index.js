import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import Mytext from "@Text";
import Mytextinput from "@TextInput";
import CheckBox from "@CheckBox";
import Dropdown from "@Dropdown";
import Button from "@Button";
import Photo from "@Photo";

export default class ListData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputsValue: [],
      selectedValue: "",
      dropdownValues: [],
      isChecked: false,
      subData: [],
      getFinalArray: this.props.getFinalArray
    };
    this.onChangeText = this.onChangeText.bind(this);
  }
  onValueChange(value) {
    // console.log("ITEMMMMM@@@@", value);
    const { item, index } = this.props;
    this.setState({
      selectedValue: value
    });
    this.props.onDropdownValue(value, item, index);
  }
  componentWillMount() {
    const { item, array } = this.props;
    this.setState(
      {
        selectedValue: item.answer,
        text: item.answer
      },
      () => {
        console.log("adfgjsssshdfgheeeeejdfg", item.answer);
      }
    );
    var data = [];
    if (item.block.question) {
      if (item.block.question.data_type === "dropdown") {
        item.block.question.options.map((res, key) => {
          data.push({ label: res.prompt, value: res.prompt });
        });
        // console.log("dropdownValues@@@", data);
        this.setState({
          dropdownValues: data
        });
      }
    }
  }

  componentWillReceiveProps(newProps) {
    // alert(JSON.stringify(newProps.item));
    var item = newProps.item;
    var data = [];
    this.setState(
      {
        selectedValue: item.answer,
        text: item.answer
      },
      () => {
        // console.log("adfgjhdfgheeeeejdfg", this.state.text);
      }
    );
    if (item.block.question) {
      if (item.block.question.data_type === "dropdown") {
        item.block.question.options.map((res, key) => {
          data.push({ label: res.prompt, value: res.prompt });
        });
        // console.log("dropdownValues@@@", data);
        this.setState({
          dropdownValues: data
        });
      }
    }
  }
  onChangeText(text) {
    // console.log("dfjgs3434343dfds", text);
    const { index, item } = this.props;
    const textInputsValue = [...this.state.textInputsValue];
    textInputsValue[index] = text;
    // let setTextInputs = this.state.getFinalArray.filter(function(obj) {
    //   if (obj.block.question && obj.block.question.key) {
    //     if (item.block.question.key[0] === obj.block.question.key[0])
    //       return (getFinalArray[index] = text);
    //   }
    // });

    this.props.onChangeTextInput(text, item);
    this.setState({
      textInputsValue
    });
  }
  onEndEditingText() {
    const { text } = this.state;
    const { item, index } = this.props;
    this.props.onChangeTextInput(text, item, index);
  }
  render() {
    const {
      item,
      index,
      navigation,
      isChecked,
      onCheckingItem,
      textInputValue,
      onChangeText,
      addAdditionalEntry,
      removeAdditionalEntry,
      addingButtonDisplay,
      addingEntriesLength
    } = this.props;
    const { dropdownValues } = this.state;
    // console.log("Iwwwww##########", item.iteration);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }}>
          {item.block.block_type === "statement" ? (
            <View>
              {item.block.statement.heading && (
                <Mytext
                  text={item.block.statement.heading}
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600"
                  }}
                />
              )}
              <Mytext text={item.block.statement.content} />
            </View>
          ) : item.block.block_type === "question" ? (
            <View>
              {item.block.question.data_type === "checkbox" ? null : (
                <Mytext text={item.block.question.prompt} />
              )}

              {item.block.question.data_type === "textbox" ? (
                <Mytextinput
                  placeholder="Enter Here"
                  value={this.state.textInputsValue[index]}
                  onChangeText={this.onChangeText}
                  onEndEditing={this.onEndEditingText}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              ) : item.block.question.data_type === "textarea" ? (
                <Mytextinput
                  placeholder="Enter Here"
                  value={this.state.textInputsValue[item]}
                  onChangeText={this.onChangeText}
                  multiline={true}
                />
              ) : item.block.question.data_type === "checkbox" ? (
                <CheckBox
                  title={item.block.question.prompt}
                  customClick={() => onCheckingItem(item)}
                  item={item}
                />
              ) : item.block.question.data_type === "dropdown" ? (
                <Dropdown
                  onValueChange={value => this.onValueChange(value)}
                  dropdownValues={dropdownValues}
                  value={this.state.selectedValue}
                />
              ) : item.block.question.data_type === "signature" ? (
                <Button
                  title="Signature"
                  customClick={() => navigation.navigate("Signature")}
                />
              ) : item.block.question.data_type === "photo" ? (
                <View>
                  <Photo
                    navigation={navigation}
                    item={item}
                    photoPreview={() => navigation.navigate("Signature")}
                  />
                  {/*item.is_repeatable &&
                    (addingEntriesLength ? (
                      <View>
                        <Button
                          title="Remove Additional Entry"
                          customClick={() => removeAdditionalEntry(item)}
                        />
                        <Button
                          title="Add Additional Entry"
                          customClick={() => addAdditionalEntry(item)}
                        />
                      </View>
                    ) : addingEntriesLength > 0 ? (
                      <Button
                        title="Add Additional Entry"
                        customClick={() => addAdditionalEntry(item)}
                      />
                    ) : null)*/}
                </View>
              ) : (
                <Mytext text={"Id: " + item.section_id} />
              )}
            </View>
          ) : (
            <Mytext text={"Id: " + item.section_id} />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
// <TouchableOpacity
//   onPress={() => onCheckingItem(item)}
//   style={{
//     borderRadius: 5,
//     marginTop: 10,
//     flexDirection: "row"
//   }}
// >
//   <View style={{ flex: 0.1 }}>
//     {isChecked ? (
//       <Image
//         source={require("@Images/verified.png")}
//         style={{ height: 20, width: 20 }}
//       />
//     ) : (
//       <Image
//         source={require("@Images/empty.png")}
//         style={{ height: 20, width: 20 }}
//       />
//     )}
//   </View>
//   <View style={{ flex: 0.9 }}>
//     <Mytext text={item.block.question.prompt} />
//   </View>
// </TouchableOpacity>
