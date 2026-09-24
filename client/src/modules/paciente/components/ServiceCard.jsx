import { CheckIcon } from '@heroicons/react/24/outline';

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  onClick,
  variant = 'green',
}) {
  const styles = {
    green: {
      icon: 'text-[#5b8c8c]',
      border: 'border-[#5b8c8c]',
      button: 'bg-[#245249] hover:bg-[#1d453d]',
      title: 'text-slate-900',
    },

    blue: {
      icon: 'text-[#5c91ac]',
      border: 'border-[#5c91ac]',
      button: 'bg-[#6597b1] hover:bg-[#5789a2]',
      title: 'text-[#5788a2]',
    },
  };

  const current = styles[variant] ?? styles.green;

  return (
    <article
      className="
     flex min-h-97.5 flex-col
    rounded-xl border border-slate-200
    bg-white p-5
    shadow-[0_1px_3px_rgba(15,23,42,0.06)]
    transition-all duration-300 ease-out
    will-change-transform
    hover:-translate-y-1
    hover:border-slate-300
    hover:shadow-[0_12px_24px_-8px_rgba(15,23,42,0.15)]
      "
    >
      {/* ICONO */}
      <div className="flex flex-1 flex-col items-center">
        <div
          className={`
            flex h-44 w-44 items-center justify-center
            rounded-full border-[5px]
            ${current.border}
          `}
        >
          <Icon className={`h-24 w-24 ${current.icon}`} />
        </div>

        {/* TEXTO */}
        <div className="mt-7 text-center">
          <h3
            className={`
              text-lg font-bold
              ${current.title}
            `}
          >
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
      </div>

      {/* BOTÓN */}
      <button
        type="button"
        onClick={onClick}
        className={`
        relative mt-8 flex w-full items-center justify-center
        rounded px-4 py-2.5
        text-sm font-medium text-white
        transition
        ${current.button}
      `}
      >
        <CheckIcon className="absolute left-4 h-5 w-5" />

        <span>Ingresar</span>
      </button>
    </article>
  );
}
