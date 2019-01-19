import React from 'react';
import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import HomeDisplay from './client/components/HomeDisplay.js'
import CreateDisplay from './client/components/CreateDisplay.js'
import ViewDisplay from './client/components/ViewDisplay.js';

import FetchLocation from './client/components/FetchLocation.js';


export default class App extends React.Component {
  
  state={
    userLocation: null,
    usersPlaces: [],
    viewHome: true,
    viewCreate: false,
    viewMemento: false,
    // api: '192.168.0.95/3000/story',
    api: `http://${Constants.manifest.debuggerHost.split(':').shift().concat(':3000')}`,
  }

  //Handler for getting user location
getUserLocationHandler = () => {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    this.setState({
     userLocation: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0421
     }
    })
  }, err => console.log(err));
}
componentDidMount() {
  this.getUserLocationHandler();
  console.log(Constants.manifest.packagerOpts);
}


//Handler for creating memento
createMemento = () => {
  this.setState({
    viewHome:false,
    viewCreate:true,
    viewMemento:false
  })

}

//Handler for displaying the Home Screen
displayHome = () => {
  this.setState({
    viewHome:true,
    viewCreate:false,
    viewMemento:false
  })
}

//Handler for displaying the View Momento Screen
displayMemento = () =>{
  this.setState({
    viewHome:false,
    viewCreate:false,
    viewMemento:true
  })
}

  render() {
    //Conditional Render statement
    let componentArr = [];
    if(this.state.viewHome){
      componentArr.push(<HomeDisplay userLocation={this.state.userLocation} usersPlaces ={this.state.usersPlaces}
      createMemento={this.createMemento}
      displayMemento={this.displayMemento}
      />)
    }else if(this.state.viewCreate){
      componentArr.push(<HomeDisplay userLocation={this.state.userLocation} usersPlaces ={this.state.usersPlaces}
        createMemento={this.createMemento}
        displayMemento={this.displayMemento}
        api={this.state.api}
        />)
      componentArr.push(<CreateDisplay displayHome={this.displayHome}/>)
    }else if(this.state.viewMemento){
      componentArr.push(<HomeDisplay userLocation={this.state.userLocation} usersPlaces ={this.state.usersPlaces}
        createMemento={this.createMemento}
        displayMemento={this.displayMemento}
        />)
      componentArr.push(<ViewDisplay displayHome={this.displayHome}/>)
    }

    return (
      <View style={styles.container}>
        {componentArr}
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
