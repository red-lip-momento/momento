import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeDisplay from './client/components/HomeDisplay.js'
import CreateDisplay from './client/components/CreateDisplay.js'
import ViewDisplay from './client/components/ViewDisplay.js';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello </Text>
        {/* <HomeDisplay /> */}
        {/* <CreateDisplay/> */}
        <ViewDisplay/>
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
