import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";
import { projectReducer } from "../features/project/projectSlice";
import { orgReducer } from "../features/organization/organizationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    org: orgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
