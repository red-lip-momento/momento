import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler';

class CreateDisplay extends Component {
  state = {
    isModalVisible: false,
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
          onSwipe={() => this.setState({ isModalVisible: false })}
          swipeDirection="left"
        >
          <View style={{ flex: 1, backgroundColor:'white' }}>
            <View>
              <TextInput 
              style={{height: 40}}
              placeholder="Write your title!"
              onChangeText = {(text)=> this.setState({text:text})} />

              <TextInput 
              style={{height: 40}}
              placeholder="Write your story!"
              onChangeText = {(text)=> this.setState({text:text})} />

            </View>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})
 
export default CreateDisplay;