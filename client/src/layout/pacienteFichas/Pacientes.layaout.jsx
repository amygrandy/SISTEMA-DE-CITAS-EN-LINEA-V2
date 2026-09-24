import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

export default function AgendaMedicaLayout() {
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (isDesktop) {
      setDesktopSidebarOpen((prev) => !prev);
    } else {
      setMobileSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden  bg-[#e8eeee]">
      <Header onMenu={toggleSidebar} />

      {/* SIDEBAR MOBILE */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden
          ${mobileSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className={`
            absolute inset-0
            bg-slate-950/40
            backdrop-blur-[2px]
            transition-opacity duration-300

            ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0'}
          `}
        />

        {/* DRAWER */}
        <aside
          className={`
            absolute bottom-0 left-0 top-0
            w-71.25 max-w-[85vw]
            bg-white
            shadow-2xl
            transition-transform duration-300 ease-in-out

            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="h-full p-3">
            <Sidebar
              onNavigate={() => {
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </aside>
      </div>

      {/* BODY */}
      <div
        className={`
    grid h-[calc(100dvh-64px)] min-h-0
    gap-6 overflow-hidden
    p-4 sm:p-6

    transition-[grid-template-columns]
    duration-300 ease-in-out

    ${
      desktopSidebarOpen
        ? 'lg:grid-cols-[285px_minmax(0,1fr)]'
        : 'lg:grid-cols-[0px_minmax(0,1fr)]'
    }
  `}
      >
        {/* SIDEBAR DESKTOP */}
        <aside
          className={`
            hidden overflow-hidden lg:block
            transition-all duration-300 ease-in-out

            ${
              desktopSidebarOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
            }
          `}
        >
          <div className="h-full w-71.25">
            <Sidebar />
          </div>
        </aside>

        <main className="min-h-0 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
