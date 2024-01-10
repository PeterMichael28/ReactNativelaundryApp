import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";
import { images } from '../data/data';

const Carousel = () => {
  
  return (
    <View>
          <SliderBox images={ images } autoPlay circleLoop dotColor='#13274f' inactiveDotColor='#90a4ae' ImageComponentStyle={ {
              borderRadius: 6,
              width: '95%'
          } } />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})