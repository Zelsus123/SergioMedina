import {createSlice} from '@reduxjs/toolkit';


const initialState = []

const novedadesSlice = createSlice({
    name: "novedades",
    initialState,
    reducers: {
        addNovedad: (state, action)=>{
            const {
                id,
                titulo,
                contenido,
                fecha,
                autor,
                imagen
            } = action.payload;
            const nuevaNovedad = {
                id,
                titulo,
                contenido,
                fecha,
                autor,
                imagen
            };
            state.push(nuevaNovedad);
        },
        editNovedad: (state, action) => {
            const { id, titulo, contenido, imagen } = action.payload.novedad; // Usa payload directamente
            const foundNovedad = state.find(novedad => novedad.id === id);
            if (foundNovedad) {
                foundNovedad.titulo = titulo;
                foundNovedad.contenido = contenido;
                foundNovedad.imagen = imagen;
            }
        },
        deleteNovedad: (state, action)=> {
            const nFound = state.find((nF) => nF.id === action.payload);
            if (nFound){
                state.splice(state.indexOf(nFound), 1)
            }
        },
        storeNovedades: (state, action)=>{
            return action.payload
        }
    }
})

export const {addNovedad, editNovedad, deleteNovedad, storeNovedades} = novedadesSlice.actions;
export default novedadesSlice.reducer