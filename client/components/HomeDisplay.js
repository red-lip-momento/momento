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

  render() {

    let markers =[];

    if (this.props.userLocation) {
      let {innerPins, outerPins} = this.props.allMarkers;

      innerPins.map(pins => {
        let coord = {
          latitude: pins.lat,
          longitude: pins.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        markers.push(
        <MapView.Marker 
        coordinate={coord} 
        key={pins._id} 
        pinColor="red" 
        onPress={this.props.displayMemento} 
        />);

      });

      outerPins.map(pins => {
        let coord = {
          latitude: pins.lat,
          longitude: pins.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        markers.push(
        <MapView.Marker 
        coordinate={coord} 
        key={pins._id} 
        pinColor="blue" 
        />);

      });
      
    }
    

    // const { uLatitude, uLongitude} = this.props.userLocation;
  
    return (
           <View style={styles.mapContainer}>
            <StatusBar barStyle='light-content' /> 
            <View style={styles.header}>
              <Text style={styles.title}>
                momento
              </Text>
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
              {markers}
            </MapView>
            <TouchableOpacity style={styles.button} onPress={this.props.createMemento}>
              <Text style={styles.text}> Leave a Memento </Text>
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
