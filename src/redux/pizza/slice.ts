import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaProps, SearchPizzaParams, Status } from './types';

export interface PizzaSliceState {
  items: PizzaProps[];
  status: string;
}
//?{category}&sortBy=${sortBy}&order=${order}${search}
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params: SearchPizzaParams) => {
    const { category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaProps[]>(
      `https://656b1fabdac3630cf727b77a.mockapi.io/test/pizza?${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data as PizzaProps[];
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export default pizzaSlice.reducer;
