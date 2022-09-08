import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getcart = createAsyncThunk("cart/getcart", async () => {
  const res = await axios.get("/api/cart");
  return res.data.carrt;
});
export const updateqty = createAsyncThunk(
  "cart/updateqty",
  async ({ id, cart_id, arit }) => {
    await axios.put(`/api/cart-updateqty/${cart_id}/${arit}`);
    return id;
  }
);
export const deletecart = createAsyncThunk(
  "cart/deletecart",
  async ({ id, cart_id }) => {
    await axios.delete(`/api/deletecart/${cart_id}`);
    return id;
  }
);

const prodentity = createEntityAdapter({
  selectId: (cart) => cart.id,
});

const cartslice = createSlice({
  name: "cart",
  initialState: prodentity.getInitialState({
    isLoading: false,
  }),
  extraReducers: {
    [getcart.pending]: (state) => {
      state.isLoading = true;
    },
    [getcart.fulfilled]: (state, action) => {
      state.isLoading = false;
      prodentity.setAll(state, action.payload);
    },
    [getcart.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateqty.pending]: (state) => {
      state.isLoading = true;
    },
    [updateqty.fulfilled]: (state, action) => {
      state.isLoading = false;
      prodentity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateqty.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateqty.pending]: (state) => {
      state.isLoading = true;
    },
    [updateqty.fulfilled]: (state, action) => {
      state.isLoading = false;
      prodentity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [updateqty.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deletecart.pending]: (state) => {
      state.isLoading = true;
    },
    [deletecart.fulfilled]: (state, action) => {
      state.isLoading = false;
      prodentity.removeOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
    [deletecart.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const cartselect = prodentity.getSelectors((state) => state.cart);
export default cartslice.reducer;
