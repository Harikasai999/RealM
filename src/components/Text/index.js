import React from 'react';
import {  Text, StyleSheet } from 'react-native';
const index = props => {
  return <Text style={props.style}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,  
  },
});
export default index;