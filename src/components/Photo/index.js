import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Button from "@Button";
var photos = [];
// var photosArray =[
//   {
//     id:"1",
//     imageUrl:"https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg"
//   },
//   {
//     id:"2",
//     imageUrl:"https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg"
//   }
// ]
const options = {
  title: "NALGroup",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      spinner: false,
      photosArray: []
    };
    this.onChoosingOption = this.onChoosingOption.bind(this);
    this.onSelectedPhoto = this.onSelectedPhoto.bind(this);
  }
  onSelectedPhoto() {
    const { item } = this.props;
    console.log("ITEMMMffffffMM@@@@@@", item.block.question.max);

    if (parseInt(item.block.question.max) === this.state.photosArray.length) {
      Alert.alert("NALGroup", "Maximum photos limit is reached.");
    } else {
      this.setState({
        spinner: true
      });
      ImagePicker.showImagePicker(options, response => {
        console.log("Responsdfdfdsfdfe = ", response);
        // alert(
        //   "source:  You can also display the image using data:" +
        //     JSON.strigify(response)
        // );
        if (response.didCancel) {
          this.setState({
            spinner: false
          });
          console.log("User cancelled image picker");
        } else if (response.error) {
          this.setState({
            spinner: false
          });
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          this.setState({
            spinner: false
          });
          console.log("User tapped custom button: ", response.customButton);
        } else {
          const source = { uri: response.uri };
          this.setState(
            {
              avatarSource: response.uri
              // spinner: false
            },
            () => {
              this.addingPhotos();
            }
          );
        }
      });
    }
  }
  addingPhotos() {
    var uniqueId =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    photos.push({ id: uniqueId, imageUrl: this.state.avatarSource });
    console.log("PRJHOTSVNSDFHDGH", photos);
    this.setState({
      photosArray: photos,
      spinner: false
    });
  }
  onRemovingImage(item, index) {
    photos.splice(index, 1);
    this.setState({
      photosArray: photos
    });
    //  this.state.photosArray.splice()
  }
  onChoosingOption(item, index) {
    const { navigation } = this.props;
    Alert.alert(
      "NALGroup",
      "What would you like to do with this photo?",
      [
        {
          text: "Remove",
          onPress: () => this.onRemovingImage(item, index)
        },
        {
          text: "Preview",
          onPress: () =>
            navigation.push("PhotoPreview", {
              previewImage: item.imageUrl
            })
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed")
        }
      ],
      { cancelable: false }
    );
  }
  renderData = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.onChoosingOption(item, index)}>
        <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  };
  render() {
    const { item } = this.props;
    const { photosArray, spinner } = this.state;
    // item.block.question.max = 5;
    console.log("ITEMMMffffffMM@@@@@@", item.block.question.max);
    return (
      <View style={{ flex: 1 }}>
        {/*this.state.spinner ? (
          <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator />
          </View>
        ) : this.state.avatarSource ? (
          <TouchableOpacity onPress={this.onChoosingOption}>
            <Image
              source={{ uri: this.state.avatarSource }}
              style={{
                height: 75,
                width: 75,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "lightgrey"
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          />
          )*/}
        {/*spinner?
         ( <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator />
          </View>): (<View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          />)*/}
        {photosArray && photosArray.length > 0 ? (
          <FlatList
            data={photosArray}
            horizontal={true}
            renderItem={this.renderData}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        ) : spinner ? (
          <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 5,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "lightgrey",
              backgroundColor: "white"
            }}
          />
        )}

        <Button title="Photo" customClick={this.onSelectedPhoto} />
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
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white"
  }
});
export default index;
