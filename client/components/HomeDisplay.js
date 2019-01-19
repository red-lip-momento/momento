import React, { Component } from 'react';
import {
  Dimensions, StatusBar, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { Constants, MapView } from 'expo';
/* eslint-disable */
class HomeDisplay extends Component {
  //  state = {  }
  constructor(props) {
    super(props);
  }

  /*
        props {
            userLocation: {
                latitiude: 1232,
                longitude: 12321
            },
            usersPlaces: [],
            createMemento: function() {
                does xxyz
            }
        }


    */
  render() {

    let userLocationMarker = null;
    if (this.props.userLocation) {
      userLocationMarker = (
<MapView.Marker 
          coordinate={this.props.userLocation} 
        //   image={require('../../assets/small-gift-box.png')}
          onPress = {this.props.displayMemento}
          />
);
    }
    const usersMarkers = this.props.usersPlaces.map(userPlace => (
          <MapView.Marker coordinate={userPlace} key={userPlace.id} />
    ));

    // const { uLatitude, uLongitude} = this.props.userLocation;
  
    return (
      <View style={styles.mapContainer}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.title}>momento</Text>
        </View>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
              latitude: 33.988,
              longitude: -118.47099,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
        >
          {userLocationMarker}
          {usersMarkers}
        </MapView>
          <TouchableOpacity style={styles.button} onPress={this.props.createMemento}>
            <Text style={styles.text}>
              leave a momento
            </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const primary = 'rgba(175, 214, 238, 1)';

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 12,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
  map: {
    
    // height: Dimensions.get('screen').height*0.9,
    display: 'flex',
    flex: 1,
    alignContent: 'flex-end',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: primary,
    height: '10%',
    width: '100%',
    padding: 5,
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
export default HomeDisplay;
