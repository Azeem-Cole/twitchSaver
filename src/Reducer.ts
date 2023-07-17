import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  count: number;
  twithAccessToken?: string;
  youTubeAccessToken?: string;
};

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    setTwitchToken(state, action: PayloadAction<string | undefined>) {
      state.twithAccessToken = action.payload;
    },
  },
});

export const rootReducer = counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;

