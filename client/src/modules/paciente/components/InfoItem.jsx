export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-slate-50 p-3 sm:p-4">
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl bg-[#e9f2f0]
          text-[#245249]
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-400 sm:text-sm">{label}</p>

        <p
          className="
            mt-1 wrap-break-word
            text-sm font-semibold
            text-slate-700
            sm:text-base
          "
        >
          {value || 'No registrado'}
        </p>
      </div>
    </div>
  );
}
