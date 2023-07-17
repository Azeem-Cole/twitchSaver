import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";

export const getCounter = (state: RootState) => state.rootReducer;

const getCount = createSelector(getCounter, (value) => value.count);
const getYoutubeToken = createSelector(
  getCounter,
  (value) => value.twithAccessToken
);

export { getCount, getYoutubeToken };
