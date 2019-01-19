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
    // const usersMarkers = this.props.allMarkers.map(userPlace => (
    //       <MapView.Marker coordinate={userPlace} key={userPlace.id} />
    // ));

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
                  {userLocationMarker}
                  {usersMarkers}
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
