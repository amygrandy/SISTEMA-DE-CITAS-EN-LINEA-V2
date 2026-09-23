import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './modules/login/Login';
import SacarFichaMedica from './modules/home/PortalPaciente';
import AdminCNS from './modules/home/AdminCNS';
import AdminLayaout from './layout/admin/AdminLayaout';
import EstablecimientoPage from './modules/establecimientos/pages/EstablecimientoPage';

//
import ConsultorioTab from './modules/consultorios/Consultorio.tab';
//
import NotFoundPage from './NotFound/NotFoundPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import UsuarioNormaRoute from './routes/UsuarioNormaRoute';
//
import PacienteLayout from './layout/paciente/PacienteLayout';
import FamiliaPage from './modules/paciente/page/familia/page/FamiliaPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/paciente" element={<SacarFichaMedica />} /> */}
        <Route path="/ejemplo" element={<AdminCNS />} />
        <Route path="/admin" element={<AdminLayaout />}>
          <Route index element={<Navigate to="establecimientos" replace />} />
          <Route path="establecimientos" element={<EstablecimientoPage />} />
          <Route path="consultorios" element={<ConsultorioTab />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<UsuarioNormaRoute />}>
            <Route path="/paciente" element={<PacienteLayout />}>
              <Route index element={<Navigate to="familia" replace />} />
              <Route path="familia" element={<FamiliaPage />} />
            </Route>
          </Route>
        </Route>

        {/* ================= PRIVADAS ================= */}
        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
