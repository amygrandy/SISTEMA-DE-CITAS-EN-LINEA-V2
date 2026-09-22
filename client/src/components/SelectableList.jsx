import { useMemo, useState } from 'react';
import { BuildingOffice2Icon, CheckIcon } from '@heroicons/react/24/outline';

import SearchInput from './SearchInput';

export default function SelectableList({
  title = 'Seleccione una opción',
  description = '',
  items = [],
  value,
  onChange,
  searchPlaceholder = 'Buscar...',
  multiple = false,
  loading = false,
  icon: Icon = BuildingOffice2Icon,
}) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return items;

    return items.filter((item) => item.label?.toLowerCase().includes(text));
  }, [items, search]);

  const isSelected = (itemValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(itemValue);
    }

    return value === itemValue;
  };

  const handleSelect = (itemValue) => {
    if (loading) return;

    if (multiple) {
      const values = Array.isArray(value) ? value : [];

      if (values.includes(itemValue)) {
        onChange?.(values.filter((id) => id !== itemValue));
      } else {
        onChange?.([...values, itemValue]);
      }

      return;
    }

    onChange?.(itemValue);
  };

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={searchPlaceholder}
        disabled={loading}
      />

      <div className="mt-4 max-h-91.25 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200">
        {loading ? (
          <LoadingList />
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const selected = isSelected(item.value);

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item.value)}
                className={`
                  flex w-full items-center gap-4
                  border-b border-slate-100
                  px-4 py-4
                  text-left
                  transition
                  last:border-none
                  ${selected ? 'bg-emerald-50' : 'hover:bg-slate-50'}
                `}
              >
                <div
                  className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    ${
                      selected
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-slate-100 text-slate-500'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800">{item.label}</p>

                  {item.description && (
                    <p className="mt-0.5 text-sm text-slate-500">
                      {item.description}
                    </p>
                  )}
                </div>

                {selected && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })
        ) : (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            No se encontraron registros.
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingList() {
  return (
    <div className="divide-y divide-slate-100">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex animate-pulse items-center gap-4 px-4 py-4"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />

          <div className="flex-1">
            <div className="h-4 w-1/2 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
