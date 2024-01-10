import {
    Image,
 Pressable,
 StyleSheet,
 Text,
 TouchableOpacity,
 View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, selectCart } from "../features/cartSlice";
import { decrementQty, incrementQty } from "../features/productSlice";

const Products = ({ data }) => {

    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const addItemToCart = () => {
      dispatch(addToCart(data)); // cart
      dispatch(incrementQty(data)); // product
    };


 
 return (
  <View>
   <Pressable
    style={{
     backgroundColor: "#f8f8f8",
     borderRadius: 8,
     padding: 10,
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     margin: 14,
    }}
   >
    <View>
     <Image
      source={{ uri: data.image }}
      style={{
       width: 60,
       height: 60,
       resizeMode: "contain",
      }}
     />
    </View>
    <View>
     <Text style={{width: 80, fontSize: 17, fontWeight: '500', marginBottom: 7}}>{data.name}</Text>
     <Text style={{width: 50, fontSize: 15, marginBottom: 7, color: 'gray'}}>$ {data.price}</Text>
    </View>
    {cart.some((c) => c.id === data.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(data)); // cart
                dispatch(decrementQty(data)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {data.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(data)); // cart
                dispatch(incrementQty(data)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
   </Pressable>
  </View>
 );
};

export default Products;

const styles = StyleSheet.create({});
