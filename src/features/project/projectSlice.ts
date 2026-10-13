import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface projectType {
  id: string;
  name: string;
}

const initialState: projectType = {
  id: "",
  name: "",
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    mutateProjectState: (state, action: PayloadAction<projectType>)=>{
        const {id, name} = action.payload; 
        state.id = id
        state.name = name
    }
  }
});

export const {mutateProjectState} = projectSlice.actions;
export const projectReducer = projectSlice.reducer;