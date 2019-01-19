import React,  { Component } from 'react';
import { StyleSheet, Text, View,   TouchableOpacity, } from 'react-native';
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
                > 
                <TouchableOpacity style={styles.button}>
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
         width: "100%",
         height: "100%",
         marginTop: '10%',
     },
     map: {
         height: "100%",
         width:"100%"
     }, 
     button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        height: '8%',
        width: '70%',
        padding: 5
     },
     text: {
         fontSize: 25
     }
 })
 export default  HomeDisplay;
