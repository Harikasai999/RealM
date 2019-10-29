import React from "react";
import { Button, Text, View, Alert, Image } from "react-native";
import Realm from "realm";
import Mybutton from "@Button";
import Carousel from "react-native-snap-carousel";
let realm;
var entries = [
  {
    id: "1",
    imageUrl:
      "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg"
  },
  {
    id: "2",
    imageUrl:
      "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
  },
  {
    id: "3",
    imageUrl:
      "https://i.pinimg.com/736x/11/2b/74/112b746a2182417b2a947d949798c968.jpg"
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "5",
    imageUrl:
      "https://media.gettyimages.com/photos/red-pompom-dahlia-picture-id97352364?s=612x612"
  },
  {
    id: "6",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhDWVBY_BYVle_XkuXW_M6Ds75o96_TpauSzJ_cM1TZ1QDl6x&s"
  },
  {
    id: "7",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVQvzsNPevA37_Mt-ZOtTF06cN6zztOWNPlDTEY0B4UPLzFGx&s"
  },
  {
    id: "8",
    imageUrl:
      "https://media.gettyimages.com/photos/cosmos-flower-picture-id184861138?s=612x612"
  }
];
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    // realm = new Realm({ path: "FormDatabase.realm" });
    // var form_details = realm.objects("form_details");
    // this.state = {
    //   dataForm: form_details
    // };
  }
  _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  };
  render() {
    // var gettingData = JSON.parse(this.state.dataForm[0].form);
    // console.log("ADFAFASFASFAFASFASFEQREQR", gettingData);
    return (
      <View style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
        <Mybutton
          title="Submit"
          customClick={() => this.props.navigation.navigate("HomeScreen")}
        />
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={entries}
          renderItem={this._renderItem}
          sliderWidth={300}
          itemWidth={100}
          loop={true}
          enableSnap={true}
        />
      </View>
    );
  }
}
