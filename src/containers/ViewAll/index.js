import React from 'react';
import { FlatList, View } from 'react-native';
import Mytext from '@Text';
import Realm from 'realm';
let realm;

export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    realm = new Realm({ path: 'UserDatabase.realm' });
    var user_details = realm.objects('user_details');
    this.state = {
      users: user_details,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.users.length === 0
          ?
          (
            <Mytext text="No Users" />)
          : (
            <FlatList
              data={this.state.users}             
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 5, borderColor: 'lightgrey', borderWidth: 0.5, marginTop: 10 }}>
                  <Mytext text={"Id: " + item.user_id} />
                  <Mytext text={"Name: " + item.user_name} />
                  <Mytext text={"Contact: " + item.user_contact} />
                  <Mytext text={"Address: " + item.user_address} />                 
                </View>
              )}
            />
          )}

      </View>
    );
  }
}