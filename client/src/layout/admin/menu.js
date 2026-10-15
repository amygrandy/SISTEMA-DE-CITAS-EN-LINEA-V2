import {
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const menu = [
  {
    nombre: 'Inicio',
    path: '/admin',
    icon: HomeIcon,
    end: true,
  },
  {
    nombre: 'ESTABLECIMIENTO',
    path: '/admin/establecimientos',
    icon: CalendarDaysIcon,
  },
  {
    nombre: 'GESTION DE CONSULTORIOS',
    path: '/admin/consultorios',
    icon: UserGroupIcon,
  },
  {
    nombre: 'PARAMETROS GLOBALES',
    path: '/admin/parametros-globales',
    icon: UserGroupIcon,
  },
  {
    nombre: 'REPORTES CONSULTORIO',
    path: '/admin/reportes/consultorio',
    icon: UserGroupIcon,
  },
  {
    nombre: 'REPORTES ESTABLECIMIENTO',
    path: '/admin/reportes/establecimiento',
    icon: UserGroupIcon,
  },
  // {
  //   nombre: 'GESTION DE TIPOS DE CONSULTORIOS',
  //   path: '/admin/medicos',
  //   icon: UsersIcon,
  // },
  // {
  //   nombre: 'Especialidades',
  //   path: '/admin/especialidades',
  //   icon: ClipboardDocumentListIcon,
  // },
  // {
  //   nombre: 'Establecimientos',
  //   path: '/admin/establecimientos',
  //   icon: BuildingOffice2Icon,
  // },
  // {
  //   nombre: 'Reportes',
  //   path: '/admin/reportes',
  //   icon: DocumentChartBarIcon,
  // },
  // {
  //   nombre: 'Configuración',
  //   path: '/admin/configuracion',
  //   icon: Cog6ToothIcon,
  // },
];
