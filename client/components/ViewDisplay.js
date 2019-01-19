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
      return (
        <View>
        <Text>Hello View Display</Text>

          <Modal 
          isVisible={this.state.isModalVisible} 
          onSwipe={() => this.props.displayHome()}
          swipeDirection="left"

        >
        <View  style={styles.container}>
          {/* style={{ height: 'auto', width: 'auto',backgroundColor:'white' }}> */}
          <TouchableOpacity onPress={() => this.flipCard()}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <View> 
              <Text style={styles.flipText}>
                Title
              </Text>

              </View>
              
              <Text style={styles.flipText}>
                Hello this is my story and I want to see how this looks like when it's a really long sotry so here I am typing away like a maniac. I realize I can copy the lorem ipsum text, but that's boring so here I am rambling away. It's wild. I hope this looks really nice. This is a reasonable text right? idk
              </Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={styles.flipText}>
                This text is flipping on the back.
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
    
  },
  flipCard: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
    margin: '5%'
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
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