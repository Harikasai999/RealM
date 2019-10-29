import React, { Component } from "react";
import { View, Image } from "react-native";

export default class PhotoPreview extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      previewImage: navigation.getParam("previewImage"),
      spinner: false
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: this.state.previewImage }}
          style={{ height: 300, width: 300 }}
        />
      </View>
    );
  }
}
