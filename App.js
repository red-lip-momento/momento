import React from 'react';
import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import HomeDisplay from './client/components/HomeDisplay.js'
import CreateDisplay from './client/components/CreateDisplay.js'
import ViewDisplay from './client/components/ViewDisplay.js';

import FetchLocation from './client/components/FetchLocation.js';


export default class App extends React.Component {
  
  state={
    title:'',
    story:'',
    userLocation: null,
    usersPlaces: [],
    viewHome: true,
    viewCreate: false,
    viewMemento: false,
    api: 'https://brave-sloth-74.localtunnel.me', // option 1: need start localtunnel before react dev server
    // option 2: the line below will resolve to the IP address of the computer at runtime.
    // if the express server is also running at port 3000
    // the app can make fetch requests to the server 
    // as long as they are connected to the same wifi network
    // api: `http://${Constants.manifest.debuggerHost.split(':').shift().concat(':3000')}`,
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

//Handler for updating form data on create memento
updateValue = (text, field) => {
  if(field == 'title'){
    this.setState({
      title: text,
    })
  }
  if(field == 'story'){
    this.setState({
      story: text,
    })
  }
}

//Handler for submitting a new memento
submit = () => {
  let collection ={};
  collection.title = this.state.title;
  collection.story = this.state.story;
  collection.lat = this.state.userLocation.latitude;
  collection.lng = this.state.userLocation.longitude;

  console.log("memento form data:", collection);

  this.displayHome();

  //Fetch-POST request
  var url = 'http://192.168.0.95:3000/story/create';
  var data = collection;


  fetch(url, {
    method: 'POST', // or 'PUT'
    headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // data can be `string` or {object}!
  }).then(res => res.json())
  .then(response => console.log('Success:', response))
  .catch(error => console.log('Error:', JSON.stringify(error)));
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
      componentArr.push(<CreateDisplay displayHome={this.displayHome} updateValue={this.updateValue} submit={this.submit}/>)
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
