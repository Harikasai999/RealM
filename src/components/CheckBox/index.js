import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
const index = props => {
  // console.log("adfjkhdfh", props.item.answer);
  return (
    <TouchableOpacity
      onPress={() => props.customClick(props.item)}
      style={styles.buttonStyle}
    >
      <View style={{ flex: 0.1 }}>
        {props.item.answer === "Yes" ? (
          <Image
            source={require("@Images/verified.png")}
            style={{ height: 20, width: 20 }}
          />
        ) : (
          <Image
            source={require("@Images/empty.png")}
            style={{ height: 20, width: 20 }}
          />
        )}
      </View>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
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
