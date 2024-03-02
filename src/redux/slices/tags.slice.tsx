import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagState {
  tags: string[];
}

const initialState: TagState = {
  tags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState: initialState,
  reducers: {
    pushTags: (state, action: PayloadAction<string>) => {
        state.tags.push(action.payload);
    },
  },
});

export default tagSlice.reducer;

export const { pushTags } = tagSlice.actions;
