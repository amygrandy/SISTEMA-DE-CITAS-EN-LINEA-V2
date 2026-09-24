import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

export default function Header({ onMenu }) {
  return (
    <header className="flex h-16 items-center justify-between bg-[#064135] px-6 text-white shadow-sm">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
            <img
              src="./logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="text-xl font-medium">Caja Nacional de Salud</h1>
        </div>

        <button
          type="button"
          onClick={onMenu}
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-7">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-medium">ELVIS LUIS CHAVEZ TORREZ</p>

          <p className="text-xs text-white/90">elvis.chavez</p>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <UserIcon className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
}
