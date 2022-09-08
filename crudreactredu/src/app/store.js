import { configureStore } from '@reduxjs/toolkit';
import keranjangreducer from "../features/Keranjangslice" 
import userreducer from "../features/Userslice" 
import categoryreducer from "../features/Categoryslice" 
import productreducer from "../features/Productslice" 
import cartreducer from "../features/Cartslice" 
export const store = configureStore({
  reducer: {
    keranjang: keranjangreducer,
    cart : cartreducer,
    user: userreducer,
    category: categoryreducer,
    product: productreducer,
  },
});
