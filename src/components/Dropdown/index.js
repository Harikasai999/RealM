import React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
class index extends React.Component {
  render() {
    const { onValueChange, dropdownValues, value } = this.props;
    return (
      <View
        style={{
          marginTop: 10,
          borderColor: "grey",
          borderWidth: 1,
          height: 40,
          justifyContent: "center",
          width: 300,
          borderRadius: 5
        }}
      >
        <RNPickerSelect
          onValueChange={onValueChange}
          items={dropdownValues}
          value={value}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "#111825",
    fontSize: 18
  },
  buttonStyle: {
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row"
  }
});
export default index;
