import {
  PlusIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const modalConfig = {
  crear: {
    title: 'Confirmar creación',
    description:
      '¿Deseas crear este registro? Se guardará la información ingresada y quedará disponible en el sistema.',
    button: 'Sí, crear',
    color: 'bg-emerald-800 hover:bg-emerald-900',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    Icon: PlusIcon,
  },

  editar: {
    title: 'Confirmar edición',
    description:
      '¿Deseas guardar los cambios realizados? Esta acción actualizará la información del registro seleccionado.',
    button: 'Sí, guardar cambios',
    color: 'bg-emerald-800 hover:bg-emerald-900',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    Icon: PencilSquareIcon,
  },

  estado: {
    title: 'Confirmar cambio de estado',
    description:
      '¿Deseas cambiar el estado de este registro? El sistema actualizará su disponibilidad.',
    button: 'Sí, cambiar estado',
    color: 'bg-green-800 hover:bg-green-900',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    Icon: ArrowPathIcon,
  },
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  type = 'crear',
  loading,
}) {
  if (!open) return null;

  const config = modalConfig[type];
  const Icon = config.Icon;

  return (
    <div
      className="
      fixed inset-0 z-50 
      flex items-center justify-center
      bg-black/40 backdrop-blur-sm
      "
    >
      <div
        className="
        w-full max-w-md
        rounded-3xl
        bg-white
        p-6
        shadow-2xl
        animate-in fade-in zoom-in
        "
      >
        {/* HEADER */}
        <div className="relative">
          <button
            onClick={onClose}
            className="
            absolute right-0 top-0
            rounded-full
            p-2
            text-slate-400
            hover:bg-slate-100
            "
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <div
            className={`
              mx-auto
              flex
              h-20 w-20
              items-center justify-center
              rounded-full
              ${config.iconBg}
            `}
          >
            <Icon
              className={`
              h-10 w-10
              ${config.iconColor}
              `}
            />
          </div>

          <h2
            className="
            mt-5
            text-center
            text-xl
            font-bold
            text-slate-900
            "
          >
            {config.title}
          </h2>

          <p
            className="
            mt-2
            text-center
            text-sm
            leading-6
            text-slate-500
            "
          >
            {config.description}
          </p>
        </div>

        {/* BOTONES */}
        <div
          className="
          mt-6
          flex
          gap-3
          "
        >
          <button
            onClick={onClose}
            className="
            flex-1
            rounded-xl
            border
            border-slate-200
            px-4 py-3
            text-sm
            font-semibold
            text-slate-600
            hover:bg-slate-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className={`
            flex-1
            rounded-xl
            px-6 py-3
            text-sm
            font-semibold
            text-white
            transition
            ${config.color}
            `}
          >
            <div className="flex justify-center gap-1">
              {loading && <ArrowPathIcon className="h-5 w-5 animate-spin" />}

              {loading ? 'Procesando...' : config.button}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
