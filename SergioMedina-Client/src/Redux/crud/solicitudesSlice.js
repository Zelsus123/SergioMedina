import {createSlice} from '@reduxjs/toolkit';
import {SolicitudesFakeData} from '../../components/SolicitudesPage/Data/SolicitudesFakeData'

const initialState = []

const solicitudesSlice = createSlice({
    name: "solicitudes",
    initialState,
    reducers: {
        addSolicitud: (state, action)=>{
            const {
                id,
                estudiante,
                seccion,
                turno,
                periodo,
                fecha,
                tipo,
                representante,
                correo,
                nacido,
                edad,
                cedula,
                curso,
                proceso
            } = action.payload;
            const nuevaSolicitud = {
                id,
                estudiante,
                seccion,
                turno,
                periodo,
                fecha,
                tipo,
                representante,
                correo,
                nacido,
                edad,
                cedula,
                proceso,
                curso,
                
                
            };
            state.push(nuevaSolicitud);
        },
        processSolicitud: (state, action)=>{
            const {
                id
            } = action.payload;
            const foundSolicitud = state.find((solicitud)=> solicitud.id === id);
            if(foundSolicitud){
                foundSolicitud.procesado = true
            }
        },
        storeSolicitudes: (state, action)=>{
            return action.payload
        }
      
    }
})

export const {addSolicitud, processSolicitud, storeSolicitudes} = solicitudesSlice.actions;
export default solicitudesSlice.reducer