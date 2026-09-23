export default function InfoItem({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {Icon && <Icon className="h-5 w-5 shrink-0 text-[#245249]" />}

        <span>{label}:</span>
      </div>

      <p className="mt-1 pl-7 text-sm font-medium text-slate-800">
        {value || 'Sin registro'}
      </p>
    </div>
  );
}
