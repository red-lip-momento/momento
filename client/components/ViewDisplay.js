import React,  { Component } from 'react';
import { StyleSheet, Text, View,   TouchableOpacity, } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { Gravity } from 'expo-sensors/build/DeviceMotion';
import Modal from "react-native-modal";




class ViewDisplay extends Component {
    state = { 
      isModalVisible: true,

     }
    render() { 
        return (
      <View style={styles.outer}>
        <Text>Hello View Display</Text>

          <Modal 
          isVisible={this.state.isModalVisible} 
          onSwipe={() => this.setState({ isModalVisible: false })}
          swipeDirection="left"
          
        >
        <View >
          {/* style={{ height: 'auto', width: 'auto',backgroundColor:'white' }}> */}
        <FlipCard 
            style={styles.card}
            friction={6000000}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            // alignWidth={true}
            // alignHeight={true}
            // useNativeDriver={true}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Text>The Face</Text>
            </View>
            {/* Back Side */}
            <View style={styles.back}>
              <Text>The Back</Text>
            </View>
          </FlipCard>
          </View>
        </Modal>
      </View>

            
         );
    }

}

const styles = StyleSheet.create({
  // outer: {
  //    height: '100%',
  //    width: 800
  // },
  card:{
    // display: 'flex',
    // flex: 1,
    width: 300,
    backgroundColor: 'orange',
    zIndex: 10,
    height:'100%'

  },
  face:{
    height: 300,
    width: 300,
    backgroundColor: 'pink'
  },
  back:{
    height: 300,
    width: 300,
    backgroundColor: 'blue'
  }
  
})
 
export default ViewDisplay;