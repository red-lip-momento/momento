import React,  { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MapView} from 'expo';

class HomeDisplay extends Component {
    //  state = {  }
    constructor(props){
        super(props);
    }
     render() { 
         return (
             <View style={styles.mapContainer}>
                <MapView
                    style= {styles.map}
                    provider="google"
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
             </View>
           
         );
     }
 }

 const styles = StyleSheet.create({
     mapContainer: {
         width: "100%",
         height: "90%",
         marginTop: 10
     },
     map: {
         height: "100%",
         width:"100%"
     } 
 })
 export default  HomeDisplay;
