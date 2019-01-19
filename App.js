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
    allMarkers: {},
    viewHome: true,
    viewCreate: false,
    viewMemento: false,
    currentMomento: {
      title: 'I love pizza and tacos',
      story: '🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮',
      storyId: 13,
      lat: 33.563760,
      lng: -118.241900,
      createdAt: '2019-01-19 10:42:00+00',
    },
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
    let collection ={};
    console.log('lat: ', position.latitude);
    collection.lat = position.coords.latitude;
    collection.lng = position.coords.longitude;
    var url = 'http://192.168.0.95:3000/story/all';
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection), // data can be `string` or {object}!
  }).then(res => res.json())
    .then(response => {
    this.setState({
      userLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421
       },
      allMarkers: response
    });
  })
  .catch(error => console.log('Error:', JSON.stringify(error)));
  }, err => console.log(err));
}


componentDidMount() {
  this.getUserLocationHandler();
  // this.g etAllStories();
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
displayMemento = (id) =>{

  var url = 'http://192.168.0.95:3000/story/';
console.log("THE ID IS " ,id)

 /* fetch(url, {
    method: 'POST', // or 'PUT'
    headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(id), // data can be `string` or {object}!
  }).then(res => res.json())
  .then(response => {
    this.setState({
      currentMomento: {
        title: 'I love pizza and tacos',
        story: '🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮',
        storyId: 13,
        lat: 33.563760,
        lng: -118.241900,
        createdAt: '2019-01-19 10:42:00+00',
      },
      viewHome:false,
      viewCreate:false,
      viewMemento:true
    })
    console.log('Success:', response);
  })
  .catch(error => console.log('Error:', JSON.stringify(error)));
  */
  this.setState({
    currentMomento: {
      title: 'I love pizza and tacos',
      story: '🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮🍕🍕🍕🌮🌮',
      storyId: 13,
      lat: 33.563760,
      lng: -118.241900,
      createdAt: '2019-01-19 10:42:00+00',
    },
    viewHome:false,
    viewCreate:false,
    viewMemento:true
  })
  // this.setState({
 
  // })
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

//Event Handler to get all markers to display on map
getAllStories = (postion) => {
  let collection ={};
  if(this.state.userLocation){

  collection.lat = this.state.userLocation.latitude;
  collection.lng = this.state.userLocation.longitude;

  var url = 'http://192.168.0.95:3000/story/all';
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection), // data can be `string` or {object}!
  }).then(res => res.json())
  .then(response => {
    this.setState({
      allMarkers: response
    })
  })
  .catch(error => console.log('Error:', JSON.stringify(error)));
}
}



  render() {
    //Conditional Render statement
    let componentArr = [];
    if(this.state.viewHome){
      componentArr.push(<HomeDisplay 
      userLocation={this.state.userLocation} 
      allMarkers ={this.state.allMarkers}
      createMemento={this.createMemento}
      displayMemento={this.displayMemento}
      />)
    }else if(this.state.viewCreate){
      componentArr.push(<HomeDisplay userLocation={this.state.userLocation} allMarkers ={this.state.allMarkers}
        createMemento={this.createMemento}
        displayMemento={this.displayMemento}
        api={this.state.api}
        />)
      componentArr.push(<CreateDisplay displayHome={this.displayHome} updateValue={this.updateValue} submit={this.submit}/>)
    }else if(this.state.viewMemento){
      console.log("CURRENT MOMENTO: " ,this.state.currentMomento);
      componentArr.push(<HomeDisplay userLocation={this.state.userLocation} allMarkers ={this.state.allMarkers}
        createMemento={this.createMemento}
        displayMemento={this.displayMemento}
        current={this.state.currentMomento}
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
