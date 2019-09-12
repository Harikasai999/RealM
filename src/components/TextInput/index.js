import React from 'react';
import { View, TextInput } from 'react-native';
const index = props => {
  return (
    <View
      style={{
       
        marginTop: 10,
        borderColor: '#007FFF',
        borderWidth: 1,
        height:40,
        justifyContent:'center',
        width:250,
        borderRadius:5
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={{paddingLeft:5}}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};
export default index;