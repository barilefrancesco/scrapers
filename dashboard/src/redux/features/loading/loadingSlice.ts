import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    show: (state) => {
      state.value = true;
    },
    hide: (state) => {
      state.value = false;
    },
  },
});

export const { show, hide } = loadingSlice.actions;
export const selectIsLoading = (state: any) => state.loading.value;

export default loadingSlice.reducer;
