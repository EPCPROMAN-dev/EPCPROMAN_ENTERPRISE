import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface userType {
  id: string;
  name: string;
}

const initialState: userType = {
  id: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    mutateUserState: (state, action: PayloadAction<userType>)=>{
        const {id, name} = action.payload; 
        state.id = id
        state.name = name
    }
  }
});

export const {mutateUserState} = userSlice.actions;
export const userReducer = userSlice.reducer;