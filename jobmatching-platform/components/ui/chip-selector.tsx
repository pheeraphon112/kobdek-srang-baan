"use client"

interface ChipOption {
  value: string
  label: string
}

interface ChipSelectorProps {
  label?: string
  options: ChipOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  error?: string
}

export function ChipSelector({
  label,
  options,
  selected,
  onChange,
  error,
}: ChipSelectorProps) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="w-full">
      {label && (
        <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                isSelected
                  ? "bg-cyan-600 text-white border-cyan-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400"
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
