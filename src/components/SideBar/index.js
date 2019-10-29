import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
class SideBar extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>SideBar</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "#111825",
    fontSize: 18
    // marginTop: 16,
    // marginLeft: 35,
    // marginRight: 35,
  },
  buttonStyle: {
    height: 40,
    width: 250,
    borderRadius: 5,
    backgroundColor: "lightgrey",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default SideBar;
