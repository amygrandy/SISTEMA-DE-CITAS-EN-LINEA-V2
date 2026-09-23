import { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import ProfileStatus from './ProfileStatus';
import AvailabilityCard from './AvailabilityCard';
import ReminderCard from './ReminderCard';

export default function PanelInformativo() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#e8eeee]">
      {/* HEADER */}
      <Header onMenu={() => setSidebarOpen((prev) => !prev)} />

      {/* CONTENIDO */}
      <main
        className={`
          grid min-h-[calc(100vh-64px)] gap-6 p-6
          transition-all duration-300

          ${
            sidebarOpen
              ? 'lg:grid-cols-[285px_minmax(0,1fr)]'
              : 'lg:grid-cols-1'
          }
        `}
      >
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        {/* DASHBOARD */}
        <div className="grid min-w-0 gap-6 xl:grid-cols-[1.4fr_1fr]">
          {/* COLUMNA CENTRAL */}
          <ProfileStatus />

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-5">
            <AvailabilityCard />

            <ReminderCard />
          </div>
        </div>
      </main>
    </div>
  );
}
