import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { email, nickname, birth, phone, roles: [] }
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload || null;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = sessionSlice.actions;
export const selectUser = (state) => state.session.user;
export const selectIsAuthenticated = (state) => Boolean(state.session.user);
export const selectRoles = (state) => state.session.user?.roles || [];
export default sessionSlice.reducer;


