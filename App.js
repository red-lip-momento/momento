import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeDisplay from './client/components/HomeDisplay.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello </Text>
        <HomeDisplay />
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
