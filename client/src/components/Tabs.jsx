export default function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            const Icon = tab.icon;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onChange(tab.value)}
                className={`
                  flex items-center gap-2
                  rounded-lg
                  px-4 py-2.5
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-white
                        text-[#005B57]
                        shadow-sm
                        ring-1 ring-slate-200
                      `
                      : `
                        text-slate-500
                        hover:bg-white/70
                        hover:text-slate-700
                      `
                  }
                `}
              >
                {Icon && (
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? 'text-[#005B57]' : 'text-slate-400'
                    }`}
                  />
                )}

                <span>{tab.label}</span>

                {tab.count !== undefined && (
                  <span
                    className={`
                      rounded-full
                      px-2 py-0.5
                      text-xs font-semibold

                      ${
                        isActive
                          ? 'bg-[#005B57]/10 text-[#005B57]'
                          : 'bg-slate-200 text-slate-500'
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
