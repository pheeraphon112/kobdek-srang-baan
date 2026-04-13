"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { ChipSelector } from "@/components/ui/chip-selector"
import {
  PREFERRED_ROLES,
  SKILLS,
  PROVINCES,
  SALARY_OPTIONS,
  AVAILABILITY_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/lib/constants"

export function ProfileForm() {
  const router = useRouter()
  const { update } = useSession()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    preferredRole: "",
    salaryExpectation: 0,
    availability: "",
    skills: [] as string[],
    experienceYears: -1,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.fullName.trim()) errs.fullName = "กรุณากรอกชื่อ-นามสกุล"
    if (!form.phone.trim()) errs.phone = "กรุณากรอกเบอร์โทรศัพท์"
    else if (form.phone.length < 9) errs.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง"
    if (!form.location) errs.location = "กรุณาเลือกพื้นที่"
    if (!form.preferredRole) errs.preferredRole = "กรุณาเลือกตำแหน่ง"
    if (!form.salaryExpectation) errs.salaryExpectation = "กรุณาเลือกเงินเดือน"
    if (!form.availability) errs.availability = "กรุณาเลือกความพร้อม"
    if (form.skills.length === 0) errs.skills = "เลือกอย่างน้อย 1 ทักษะ"
    if (form.experienceYears < 0) errs.experienceYears = "กรุณาเลือกประสบการณ์"
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salaryExpectation: Number(form.salaryExpectation),
          experienceYears: Number(form.experienceYears),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || "เกิดข้อผิดพลาด")
        setLoading(false)
        return
      }

      await update({ profileComplete: true })
      toast.success("สร้างโปรไฟล์เรียบร้อย!")
      router.push("/candidate/dashboard")
      router.refresh()
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. fullName */}
      <Input
        label="ชื่อ-นามสกุล *"
        placeholder="ชื่อ นามสกุล"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        error={errors.fullName}
      />

      {/* 2. phone */}
      <Input
        label="เบอร์โทรศัพท์ *"
        type="tel"
        placeholder="0812345678"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        error={errors.phone}
      />

      {/* 3. location */}
      <Select
        label="พื้นที่ที่ต้องการทำงาน *"
        placeholder="เลือกจังหวัด"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        options={PROVINCES.map((p) => ({ value: p, label: p }))}
        error={errors.location}
      />

      {/* 4. preferredRole */}
      <Select
        label="ตำแหน่งที่ต้องการ *"
        placeholder="เลือกตำแหน่ง"
        value={form.preferredRole}
        onChange={(e) => setForm({ ...form, preferredRole: e.target.value })}
        options={PREFERRED_ROLES.map((r) => ({
          value: r.value,
          label: r.label,
        }))}
        error={errors.preferredRole}
      />

      {/* 5. salaryExpectation */}
      <Select
        label="เงินเดือนขั้นต่ำที่คาดหวัง *"
        placeholder="เลือกเงินเดือน"
        value={form.salaryExpectation ? String(form.salaryExpectation) : ""}
        onChange={(e) =>
          setForm({ ...form, salaryExpectation: Number(e.target.value) })
        }
        options={SALARY_OPTIONS.map((s) => ({
          value: String(s.value),
          label: s.label,
        }))}
        error={errors.salaryExpectation}
      />

      {/* 6. availability */}
      <Select
        label="ความพร้อมเริ่มงาน *"
        placeholder="เลือกความพร้อม"
        value={form.availability}
        onChange={(e) => setForm({ ...form, availability: e.target.value })}
        options={AVAILABILITY_OPTIONS.map((a) => ({
          value: a.value,
          label: a.label,
        }))}
        error={errors.availability}
      />

      {/* 7. skills */}
      <ChipSelector
        label="ทักษะ * (เลือกได้หลายอย่าง)"
        options={SKILLS.map((s) => ({ value: s.value, label: s.label }))}
        selected={form.skills}
        onChange={(val) => setForm({ ...form, skills: val })}
        error={errors.skills}
      />

      {/* 8. experienceYears */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          ประสบการณ์ทำงาน *
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {EXPERIENCE_OPTIONS.map((exp) => {
            const isSelected = form.experienceYears === exp.value
            return (
              <button
                key={exp.value}
                type="button"
                onClick={() =>
                  setForm({ ...form, experienceYears: exp.value })
                }
                className={`p-2.5 text-sm rounded-xl border-2 transition-all text-center ${
                  isSelected
                    ? "border-cyan-600 bg-cyan-50 text-cyan-700 font-medium"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {exp.label}
              </button>
            )
          })}
        </div>
        {errors.experienceYears && (
          <p className="mt-1 text-xs text-red-500">{errors.experienceYears}</p>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        สร้างโปรไฟล์
      </Button>
    </form>
  )
}
