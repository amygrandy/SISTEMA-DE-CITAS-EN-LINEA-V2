import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './modules/login/Login';
import SacarFichaMedica from './modules/home/PortalPaciente';
import AdminCNS from './modules/home/AdminCNS';
import AdminLayaout from './layout/admin/AdminLayaout';
import EstablecimientoPage from './modules/establecimientos/pages/EstablecimientoPage';

//
import ConsultorioTab from './modules/consultorios/Consultorio.tab';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/paciente" element={<SacarFichaMedica />} />
        <Route path="/ejemplo" element={<AdminCNS />} />
        <Route path="/admin" element={<AdminLayaout />}>
          <Route index element={<Navigate to="establecimientos" replace />} />
          <Route path="establecimientos" element={<EstablecimientoPage />} />
          <Route path="consultorios" element={<ConsultorioTab />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
