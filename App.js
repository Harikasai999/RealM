/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';
const Realm = require('realm');
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from '@navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null, model:"", miles:"", make:"" };
    this.secondSchema = this.secondSchema.bind(this)
  }

  UNSAFE_componentWillMount() {
    //  this.secondSchema()
  }
  firstSchema() {
    Realm.open({
      schema: [{ name: 'Dog', properties: { name: 'string' } }]
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', { name: 'Rex' });
      });
      this.setState({ realm });
    });
  }
  secondSchema() {
    const CarSchema = {
      name: 'Cars',
      properties: {
        make: 'string',
        model: 'string',
        miles: { type: 'int', default: 0 },
      }
    };
    const PersonSchema = {
      name: 'Person',
      properties: {
        name: 'string',
        birthday: 'date',
        cars: 'Cars[]',
        picture: 'data?' // optional property
      }
    };

    Realm.open({ schema: [CarSchema] })
      .then(realm => {
        // Create Realm objects and write to local storage
        realm.write(() => {
          const myCar = realm.create('Cars', {
            make: this.state.make,
            model: this.state.model,
            miles: parseInt(this.state.miles),
          });
          // myCar.miles += 20; // Update a property value
        });
        // realm.write(() => {
        //   carList.push({make: 'Honda', model: 'Accord', miles: 100});
        //   carList.push({make: 'Toyota', model: 'Prius', miles: 200});
        // });
        // Query Realm for all cars with a high mileage
        // const cars = realm.objects('Cars').filtered('miles > 1000');
        const cars = realm.objects('Cars')
        console.log(" cars.length",  cars.length)
        // Will return a Results object with our 1 car
        cars.length // => 1

        // Add another car
        // realm.write(() => {
        //   const myCar = realm.create('Car', {
        //     make: 'Ford',
        //     model: 'Focus',
        //     miles: 2000,
        //   });
        // });

        // Query results are updated in realtime
        cars.length // => 2
        this.setState({ realm });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Cars').length
      : 'Loading...';
    if (this.state.realm) {
      console.log("dfjksdhfj", this.state.realm.objects('Cars'))
    }

    return (
      <SafeAreaView style={styles.container}>
        <Navigation/>
        {/* <Text style={styles.welcome}>
          {info}
        </Text>
        <TextInput 
        value={this.state.make} 
        onChangeText={(text) => { this.setState({ make: text }) }} 
        placeholder="make"
        style={{height:40, width:150, backgroundColor:'lightgrey'}}
        />
        <TextInput 
        value={this.state.model} 
        onChangeText={(text) => { this.setState({ model: text }) }} 
        placeholder="model"
        style={{height:40, width:150, backgroundColor:'lightgrey'}}
        />
        <TextInput 
        value={this.state.miles} 
        onChangeText={(text) => { this.setState({ miles: text }) }} 
        placeholder="miles"
        style={{height:40, width:150, backgroundColor:'lightgrey'}}
        />
        <TouchableOpacity onPress={this.secondSchema}>
          <Text>Add</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  welcome: {
    color: 'black'
  },

});

export default App;
