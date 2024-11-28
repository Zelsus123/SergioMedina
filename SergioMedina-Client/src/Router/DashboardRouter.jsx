import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {DashboardLayout} from "../components/DashboardPage/DashboardLayout";
import {
  Dashboard,
  AdministrarNovedades,
  Invoices,
  CrearNovedad,
  EditarNovedades,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  AdministrarSolicitudes,
  Stream,
  ViewSolicitud,
  CreateSolicitud,
  AdministrarUsers,
  CreateUser,
  EditarUser
} from "../components/DashboardPage/scenes";

export const DashboardRouter = () => {
  return (

    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/AdministrarNovedades" element={<AdministrarNovedades />} />
        <Route path="/dashboard/AdministrarNovedades/Editar/:id" element={<EditarNovedades />} />
        <Route path="/dashboard/AdministrarNovedades/Crear" element={<CrearNovedad />} />
        <Route path="/dashboard/AdministrarSolicitudes" element={<AdministrarSolicitudes />} />
        <Route path="/dashboard/AdministrarSolicitudes/:id" element={<ViewSolicitud />} />
        <Route path="/dashboard/AdministrarSolicitudes/Crear" element={<CreateSolicitud />} />
        <Route path="/dashboard/AdministrarUsuarios" element={<AdministrarUsers />} />
        <Route path="/dashboard/AdministrarUsuarios/Crear" element={<CreateUser />} />
        <Route path="/dashboard/AdministrarUsuarios/Editar/:id" element={<EditarUser />} />
        <Route path="/dashboard/invoices" element={<Invoices />} />
        <Route path="/dashboard/form" element={<Form />} />
        <Route path="/dashboard/calendar" element={<Calendar />} />
        <Route path="/dashboard/bar" element={<Bar />} />
        <Route path="/dashboard/pie" element={<Pie />} />
        <Route path="/dashboard/stream" element={<Stream />} />
        <Route path="/dashboard/line" element={<Line />} />
        <Route path="/dashboard/faq" element={<FAQ />} />
        <Route path="/dashboard/geography" element={<Geography />} />
      </Route>
    </Routes>

  )
}


