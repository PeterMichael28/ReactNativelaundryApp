import CartReducer from "../features/cartSlice"
import ProductReducer from "../features/productSlice";

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        cart:CartReducer,
        product:ProductReducer
  },

})