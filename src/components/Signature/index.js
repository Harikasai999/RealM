import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import SignaturePad from "react-native-signature-pad";
const { height, width } = Dimensions.get("window");
export default class Signature extends Component {
  _signaturePadError = error => {
    console.error(error);
  };

  _signaturePadChange = base64DataUrl => {
    console.log("Got new signature: " + base64DataUrl);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignaturePad
          onError={this._signaturePadError}
          onChange={this._signaturePadChange}
          style={{ flex: 1, backgroundColor: "white" }}
          defaultHeight={height}
          defaultWidth={width}
        />
      </View>
    );
  }
}
