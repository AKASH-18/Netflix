import { createSlice } from "@reduxjs/toolkit";

const aiSlice= createSlice({
    name: 'ai',
    initialState: {
        showAISearch: false
    },
    reducers:{
        toggleAISearchView: (state) => {
            state.showAISearch = !state.showAISearch;
        }
    }
})

export const{ toggleAISearchView} = aiSlice.actions;
export default aiSlice.reducer;