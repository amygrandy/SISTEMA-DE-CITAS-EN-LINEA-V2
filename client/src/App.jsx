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
import HistorialPage from './modules/paciente/page/historial/page/HistorialPage';

import PanelInformativo from './layout/ejemplo/PanelInformativo';
//import PerfilPage from './layout/ejemplo/perfil/PerfilPage';
import ServiciosDisponiblesPage from './layout/ejemplo/citas/ServiciosDisponiblesPage';
//
import PacienteLayaout from './layout/pacienteFichas/Pacientes.layaout';
import PanelInformativoPage from './modules/paciente/page/panelInformativo/PanelInformativoPage';
import PerfilPage from './modules/paciente/page/perfil/PerfilPage';
import BeneficiariosPage from './modules/paciente/page/beneficiarios/BeneficiariosPage';
import AgendaMedica from './modules/paciente/page/agendaMedica/inicio/page/AgendaMedica';
import EstablecimientosPage from './modules/paciente/page/Establecimientos/EstablecimientosPage';
import EspecialidadesPage from './modules/paciente/page/agendaMedica/especialidades/page/EspecialidadesPage';
import SeleccionarFechaHoraPage from './modules/paciente/page/agendaMedica/especialidades/page/SeleccionarFechaHoraPage';
//
import ParametroGlobales from './modules/parametroGlobales/ParametroGlobales.tab';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/paciente" element={<SacarFichaMedica />} /> */}
        <Route path="/ejemplo" element={<ServiciosDisponiblesPage />} />
        <Route path="/admin" element={<AdminLayaout />}>
          <Route index element={<Navigate to="establecimientos" replace />} />
          <Route path="establecimientos" element={<EstablecimientoPage />} />
          <Route path="consultorios" element={<ConsultorioTab />} />
          <Route path="parametros-globales" element={<ParametroGlobales />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<UsuarioNormaRoute />}>
            <Route path="/paciente" element={<PacienteLayaout />}>
              <Route
                index
                element={<Navigate to="panel-informativo" replace />}
              />
              <Route
                path="panel-informativo"
                element={<PanelInformativoPage />}
              />
              <Route path="perfil" element={<PerfilPage />} />
              <Route path="familia" element={<FamiliaPage />} />
              <Route path="historial" element={<HistorialPage />} />
              <Route path="beneficiario" element={<BeneficiariosPage />} />
              <Route path="agenda-medica" element={<AgendaMedica />} />{' '}
              <Route path="especialidades" element={<EspecialidadesPage />} />
              <Route
                path="seleccionar-fecha"
                element={<SeleccionarFechaHoraPage />}
              />
              <Route
                path="centros-medicos"
                element={<EstablecimientosPage />}
              />
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
