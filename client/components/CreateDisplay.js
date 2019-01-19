import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Modal from "react-native-modal";
import { BlurView } from 'expo';
import { TextInput } from 'react-native-gesture-handler';
import FetchButton from './FetchTestButton.js';


class CreateDisplay extends Component {
  state = {
    isModalVisible: true,
    text:''
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        
        <Modal 
          isVisible={this.state.isModalVisible} 
          onSwipe={() =>this.props.displayHome() }
          swipeDirection="left"
        >
          <BlurView style={styles.card} tint="light" intensity={80}>
            <View style={styles.form}>
              <TextInput 
              style={{height: 40}}
              placeholder="Write your title!"
              // onChangeText = {(text)=> this.setState({text:text})} 
              onChangeText = {(text) => this.props.updateValue(text, 'title')}
              />

              <TextInput 
              style={{height: 40}}
              placeholder="Write your story!"
              // onChangeText = {(text)=> this.setState({text:text})} 
              onChangeText = {(text) => this.props.updateValue(text, 'story')}
              />

            </View>
            {/* <TouchableOpacity onPress={this.props.displayHome }> */}
            <TouchableOpacity style={styles.submit} onPress={this.props.submit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </BlurView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: '10%',
    width: '80%',
    height: '70%',
    marginTop: '-5%',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // flex: 1,
  },
  form: {
    marginTop: "12%"
  },
  submit: {

  },
  buttonText: {
    fontSize: 16,
    color: 'rgba(81, 146, 184, 1)'
  }

})
 
export default CreateDisplay;