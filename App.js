import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeDisplay from './client/components/HomeDisplay.js'
import CreateDisplay from './client/components/CreateDisplay.js'
import ViewDisplay from './client/components/ViewDisplay.js';

import FetchLocation from './client/components/FetchLocation.js';


export default class App extends React.Component {
  
  state={
    userLatitude: null,
    userLongitude:null
  }

  //Handler for getting user location
getUserLocationHandler = () => {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    this.setState({
      userLatitude: position.coords.latitude,
      userLongitude: position.coords.longitude
    })
    
    // this.setState({
    //   userLocation:{
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     latitudeDelta: 0.05,
    //     longitudeDelta: 0.05
    //   }
    // });
  }, err => console.log(err));
}


  render() {
    return (
      <View style={styles.container}>
        <Text>Current Lat is {this.state.userLatitude} Current Long is {this.state.userLongitude}</Text>
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
        {/* <HomeDisplay userLocation={this.userLocation}/> */}
        {/* <CreateDisplay/> */}
        <ViewDisplay/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
