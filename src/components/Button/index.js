import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
const index = props => {
  return (
    <TouchableOpacity onPress={props.customClick} style={styles.buttonStyle}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
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
export default index;
