"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RoleSelector } from "./role-selector"

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "CANDIDATE" as "CANDIDATE" | "EMPLOYER",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.email) errs.email = "กรุณากรอกอีเมล"
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "กรุณากรอกอีเมลที่ถูกต้อง"
    if (!form.password) errs.password = "กรุณากรอกรหัสผ่าน"
    else if (form.password.length < 6)
      errs.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "รหัสผ่านไม่ตรงกัน"
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "เกิดข้อผิดพลาด")
        setLoading(false)
        return
      }

      // Sign in immediately after registration
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("เข้าสู่ระบบไม่สำเร็จ")
        setLoading(false)
        return
      }

      toast.success("สมัครสมาชิกสำเร็จ!")
      // Middleware will handle redirect to /onboarding/pdpa
      router.push("/onboarding/pdpa")
      router.refresh()
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <RoleSelector
        value={form.role}
        onChange={(role) => setForm({ ...form, role })}
      />

      <Input
        label="อีเมล"
        type="email"
        placeholder="example@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
      />

      <Input
        label="รหัสผ่าน"
        type="password"
        placeholder="อย่างน้อย 6 ตัวอักษร"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
      />

      <Input
        label="ยืนยันรหัสผ่าน"
        type="password"
        placeholder="กรอกรหัสผ่านอีกครั้ง"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        สมัครสมาชิก
      </Button>
    </form>
  )
}
