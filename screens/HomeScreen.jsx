import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Services from '../components/Services';
import Products from '../components/Products';
import { products } from '../data/data';
import { selectCart } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProduct } from '../features/productSlice';
import { useNavigation } from '@react-navigation/native';




const HomeScreen = () => {
    
    const cart = useSelector(selectCart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);

    const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
        "we are loading your location"
      );
    const [ locationServicesEnabled, setlocationServicesEnabled ] = useState( false );
    
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          Alert.alert(
            "Location services not enabled",
            "Please enable the location services",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        } else {
          setlocationServicesEnabled(enabled);
        }
      };
      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "allow the app to use the location services",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        }
    
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log('coords', coords)
        if (coords) {
          const { latitude, longitude } = coords;
    
          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
    
        //   console.log('response', response)
    
          for (let item of response) {
            let address = `${item.name}, ${item.street} ${item.city}, ${item.region}, ${item.postalCode}, ${item.country}`;
        
            setdisplayCurrentAddress(address);
          }
        }
      };

      useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
      }, [] );
    
      const product = useSelector(selectProduct);
      const dispatch = useDispatch();
      useEffect(() => {
        if (product.length > 0) return;
    
        const fetchProducts = async () => {

            products.map(item => dispatch(getProducts(item)))
        //   const colRef = collection(db,"types");
        //   const docsSnap = await getDocs(colRef);
        //   docsSnap.forEach((doc) => {
        //     items.push(doc.data());
        //   });
        //   items?.map((service) => dispatch(getProducts(service)));
        };
        fetchProducts();
      }, []);
     
      const navigation = useNavigation()
  return (
    <SafeAreaView style={{backgroundColor: '#f0f0f0', flex: 1}}>
          
              
       
        {/* location & profile */}
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
              <MaterialIcons name="location-on" size={ 30 } color="#fd5c63" />
              <View style={{}}>
                  <Text style={{fontSize: 19, fontWeight: '600'}}>Home</Text>
                <Text style={{color: '#585858'}}>{ displayCurrentAddress}</Text>
              </View>

              <Pressable style={{marginLeft: 'auto'}} onPress={() => navigation.navigate("Profile")}>
                  <Image source={ { uri: "https://tse3.mm.bing.net/th?id=OIP.8klPFuZfuYqlbcurY74L7AHaHZ&pid=Api&P=0&h=180" } } style={ {width: 40, height: 40, borderRadius: 20} } />
              </Pressable>
      </View>

      {/* search bar */}
        <View style={{padding: 10, margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0.8, borderColor: '#c0c0c0', borderRadius: 7}}>
            <TextInput placeholder='Search for Items or More' />
            <Feather name="search" size={24} color="#fd5c63" />
        </View>

        <ScrollView style={{}}>
        {/* image carousel */}
        <Carousel />

        {/* services component */}
          <Services />
          

          {/* products */}

            { product && product.map( (pro, i) => (
              <Products key={i} data={pro}/>
          ))}
            



          </ScrollView>

          {total === 0 ? (
            null
          ) : (
            <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >
            <View>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  $ {total}</Text>
              <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
            </View>
    
            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
          )}
     
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})