import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        language: "en",
    },
    reducers: {
        chnageLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const { chnageLanguage } = configSlice.actions;
export default configSlice.reducer;