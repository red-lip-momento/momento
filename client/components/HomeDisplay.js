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

  handleMarkerPress = (event) => {
    // console.log("ID" ,event._targetInst.return.key);
    const id = event._targetInst.return.key;
    this.props.displayMemento(id);
  } 

  render() {

    let markers =[];

    if (this.props.userLocation) {
      let {innerPins, outerPins} = this.props.allMarkers;

      innerPins.map(pins => {
        // console.log(pins);
        let coord = {
          latitude: pins.lat,
          longitude: pins.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        let id = (pins._id).toString();
        markers.push(
        <MapView.Marker 
        coordinate={coord} 
        key={pins._id} 
        pinColor="red"
        _id={id}
        onPress={(event) => this.handleMarkerPress(event)}
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
        id={pins._id}
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
