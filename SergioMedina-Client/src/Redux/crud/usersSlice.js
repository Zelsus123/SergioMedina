import {createSlice} from '@reduxjs/toolkit';


const initialState = []

const usersSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        addUser: (state, action)=>{
            const {
                id,
                nombre,
                ci,
                cargo,
                correo,
                telefono,
                contras
            } = action.payload;
            const nuevaNovedad = {
                id,
                nombre,
                ci,
                cargo,
                correo,
                telefono,
                contras
                
            };
            state.push(nuevaNovedad);
        },
        editUser: (state, action)=>{
            console.log("Payload recibido", action.payload.userData)
            const {
                id,
                nombre,
                ci,
                cargo,
                correo,
                telefono,
                contras
            } = action.payload.userData;
            const foundUser = state.find((user)=> user.id === id);
            if(foundUser){
                foundUser.nombre = nombre,
                foundUser.ci = ci,
                foundUser.cargo = cargo,
                foundUser.correo = correo,
                foundUser.telefono = telefono,
                foundUser.contras = contras
            }
        },
        deleteUser: (state, action)=> {
            const nFound = state.find((nF) => nF.id === action.payload);
            if (nFound){
                state.splice(state.indexOf(nFound), 1)
            }
        },
        storeUsers: (state, action)=>{
            return action.payload
        }
    }
})

export const {addUser, deleteUser,  editUser, storeUsers} = usersSlice.actions;
export default usersSlice.reducer