import React from "react";
import { View, TextInput } from "react-native";
const index = props => {
  return (
    <View
      style={{
        marginTop: 10,
        borderColor: "grey",
        borderWidth: 1,
        height: props.multiline ? 75 : 40,
        justifyContent: "center",
        width: 300,
        borderRadius: 5
      }}
    >
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="grey"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={{ paddingLeft: 5 }}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};
export default index;
