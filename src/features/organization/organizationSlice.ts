import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface orgType {
  id: string;
  name: string;
}

const initialState: orgType = {
  id: "",
  name: "",
};

const orgSlice = createSlice({
  name: "org",
  initialState: initialState,
  reducers: {
    mutateOrgState: (state, action: PayloadAction<orgType>) => {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
    },
  },
});

export const { mutateOrgState } = orgSlice.actions;
export const orgReducer = orgSlice.reducer;
