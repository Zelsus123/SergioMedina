import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userData: {
    id: null,
    nombre: "",
    ci: "",
    cargo: "",
    correo: "",
    telefono: "",
  }
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loggedIn = true;
      state.userData = { ...action.payload };  // Actualiza con los datos del usuario autenticado
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.userData = initialState.userData; // Reinicia userData al estado inicial
    }
  }
});

export const { loginUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
