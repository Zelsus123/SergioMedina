import {configureStore} from '@reduxjs/toolkit'
import novedades from './crud/novedadesSlice'
import solicitudes from './crud/solicitudesSlice'
import usuarios from './crud/usersSlice'
import login from './login/loginSlice'

export const Store = configureStore({
    reducer: {
        novedades,
        solicitudes,
        usuarios,
        login 
    }
})