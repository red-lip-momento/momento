/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class FetchButton extends Component {
  constructor(props) {
    super(props);

    this.handleFetch = this.handleFetch.bind(this);
  }

  handleFetch() {
    console.log('clicked!');
    fetch(this.props.api)
      .then((data) => {
        console.log('response from server!');
        console.log(data);
      })
      .catch(err => console.log('no response...', err));
  }

  render() {
    return (
      <TouchableOpacity id={this.props.id} onPress={this.handleFetch} style={styles.container}>
        <Text> Test Fetch </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '8%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
});
