import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { MapView } from 'expo';
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
                  <TouchableOpacity style={styles.button} onPress={this.props.createMemento}>
                  <Text style={styles.text}> Leave a Memento </Text>
                </TouchableOpacity>
                </MapView>



             </View>

    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    //  flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: '10%',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: '8%',
    width: '70%',
    padding: 5,
  },
  text: {
    fontSize: 25,
  },
});
export default HomeDisplay;
