"use client"

import { Briefcase, User } from "lucide-react"

interface RoleSelectorProps {
  value: "CANDIDATE" | "EMPLOYER"
  onChange: (role: "CANDIDATE" | "EMPLOYER") => void
}

const roles = [
  {
    value: "CANDIDATE" as const,
    label: "หางาน",
    labelEn: "Job Seeker",
    description: "สมัครงานและสร้างโปรไฟล์",
    icon: User,
  },
  {
    value: "EMPLOYER" as const,
    label: "หาคน",
    labelEn: "Employer",
    description: "ลงประกาศรับสมัครงาน",
    icon: Briefcase,
  },
]

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => {
        const Icon = role.icon
        const isSelected = value === role.value
        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="font-medium text-sm">{role.label}</span>
            <span className="text-xs text-gray-500">{role.description}</span>
          </button>
        )
      })}
    </div>
  )
}
