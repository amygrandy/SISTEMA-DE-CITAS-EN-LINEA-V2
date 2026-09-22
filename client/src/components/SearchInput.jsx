import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchInput({
  value = '',
  onChange,
  placeholder = 'Buscar...',
  className = '',
}) {
  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-2.5
          pl-10
          pr-10
          text-sm
          text-slate-700
          shadow-sm
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#005B57]
          focus:ring-2
          focus:ring-[#005B57]/10
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-600
          "
          aria-label="Limpiar búsqueda"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
