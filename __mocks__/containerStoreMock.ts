// Mock for container/store module federation remote
import { configureStore } from "@reduxjs/toolkit";

// Mock AppDispatch type
export type AppDispatch = ReturnType<typeof mockStore.dispatch>;

// Mock setAccessToken action
export const setAccessToken = (token: string) => ({
  type: "auth/setAccessToken",
  payload: token,
});

// Mock store for testing
const mockStore = configureStore({
  reducer: {
    auth: (state = { accessToken: null }) => state,
  },
});

export default mockStore;
