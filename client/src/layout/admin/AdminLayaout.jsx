import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8F8]">
      {/* =========================================
          SIDEBAR DESKTOP
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          hidden border-r border-slate-200 bg-white
          transition-all duration-300 ease-in-out
          lg:block
          ${sidebarCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((previous) => !previous)}
        />
      </aside>

      {/* =========================================
          OVERLAY MOBILE
      ========================================== */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0 z-40
            bg-slate-900/40
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* =========================================
          SIDEBAR MOBILE
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-white shadow-xl
          transition-transform duration-300
          lg:hidden

          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar
          collapsed={false}
          mobile
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* =========================================
          CONTENIDO
      ========================================== */}

      <div
        className={`
          min-h-screen
          transition-all duration-300

          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}
        `}
      >
        <HeaderAdmin
          abrirMenu={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed((previous) => !previous)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
