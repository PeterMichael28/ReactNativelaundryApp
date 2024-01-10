import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { services } from '../data/data';

const Services = () => {
  return (
    <View style={{paddingHorizontal: 10}}>
        <Text style={{fontSize:16, fontWeight: '600', marginBottom: 7}}>Services Available</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              { services.map( ( ser, i ) => (
                  <Pressable key={ i } style={ { margin: 10, backgroundColor: 'white', padding: 20, borderRadius: 7}}>
                      <Image source={ { uri: ser.image } } style={ {width: 70, height: 70, resizeMode: 'contain'} } />
                      <Text style={ { textAlign: 'center', marginTop: 10}}>{ ser.name }</Text>
                  </Pressable>
              ))}
        </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})