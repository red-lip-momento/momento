import React,  { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import FlipCard from 'react-native-flip-card'
import Modal from "react-native-modal";





class ViewDisplay extends Component {
    state = { 
      isModalVisible: true,

     }

     componentWillMount() {
      this.animatedValue = new Animated.Value(0);
      this.value = 0;
      this.animatedValue.addListener(({ value }) => {
        this.value = value;
      })
      this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      })
      this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })
    }


    flipCard() {
      if (this.value >= 90) {
        Animated.spring(this.animatedValue,{
          toValue: 0,
          friction: 8,
          tension: 10
        }).start();
      } else {
        Animated.spring(this.animatedValue,{
          toValue: 180,
          friction: 8,
          tension: 10
        }).start();
      }
  
    }
    render() { 
      const frontAnimatedStyle = {
        transform: [
          { rotateY: this.frontInterpolate}
        ]
      }
      const backAnimatedStyle = {
        transform: [
          { rotateY: this.backInterpolate }
        ]
      }

      const momento = this.props.current;
      console.log('current momento:', momento);
      return (
        <View>
        <Text>Hello View Display</Text>

          <Modal 
          isVisible={this.state.isModalVisible} 
          onSwipe={() => this.props.displayHome()}
          swipeDirection="left"

        >
        <View  style={styles.container}>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <View> 
                <Text style={styles.flipTitle}>
                  {momento.title}
                </Text>
              </View>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={styles.flipText}>
                {momento.story}
              </Text>
            </Animated.View>
          </TouchableOpacity>

          </View>
          
  
        </Modal>
</View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  flipCard: {
    width: '90%',
    height: '75%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.59)',
    backfaceVisibility: 'hidden',
    margin: '5%'
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  flipTitle: {
    width: 'auto',
    fontSize: 36,
    margin: 30,
    // padding: 50,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  flipText: {
    width: '90%',
    fontSize: 18,
    padding: 1,
    color: 'white',
    fontWeight: 'bold',
  }
})
 
export default ViewDisplay;