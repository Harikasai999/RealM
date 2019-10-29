import React from "react";
import { View } from "react-native";
import Mybutton from "@Button";
import Mytext from "@Text";
import Realm from "realm";
let realm;

export default class index extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: "UserDatabase.realm",
      schema: [
        {
          name: "user_details",
          properties: {
            user_id: { type: "int", default: 0 },
            user_name: "string",
            user_contact: "string",
            user_address: "string"
          }
        }
      ]
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center"
        }}
      >
        <Mybutton
          title="Menu"
          customClick={() => this.props.navigation.toggleDrawer()}
        />

        <Mybutton
          title="Register"
          customClick={() => this.props.navigation.navigate("Register")}
        />
        <Mybutton
          title="Update"
          customClick={() => this.props.navigation.navigate("Update")}
        />
        <Mybutton
          title="View"
          customClick={() => this.props.navigation.navigate("View")}
        />
        <Mybutton
          title="View All"
          customClick={() => this.props.navigation.navigate("ViewAll")}
        />
        <Mybutton
          title="Delete"
          customClick={() => this.props.navigation.navigate("Delete")}
        />
        <Mybutton
          title="UI based on API"
          customClick={() => this.props.navigation.navigate("UI")}
        />
      </View>
    );
  }
}
