import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {NovedadesPage, HomePage, LoginPage, NotFoundPage, ResenaPage, NovedadDetailPage, SolicitarDocumentoPage} from '../Pages/index'
import { Layout } from '../components/LayoutComponents/Layout'

export const Router = () => {
  return (
    

    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/noticias' element={<NovedadesPage/>}/>
        <Route path='/noticias/:id' element={<NovedadDetailPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/historia' element={<ResenaPage/>}/>
        <Route path='/solicitardocumentos' element={<SolicitarDocumentoPage/>}/>
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
      
  )
}


