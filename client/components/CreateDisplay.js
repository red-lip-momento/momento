import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler';

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
          <View style={{ flex: 1, backgroundColor:'white' }}>
            <View>
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
            <TouchableOpacity onPress={this.props.submit}>
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