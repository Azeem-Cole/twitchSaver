// reducers.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// Create a slice with the initial state and reducers
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

// Export the slice's actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
