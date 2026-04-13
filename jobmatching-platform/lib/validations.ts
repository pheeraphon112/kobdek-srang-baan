import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string(),
    role: z.enum(["CANDIDATE", "EMPLOYER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
})

export const candidateProfileSchema = z.object({
  fullName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  phone: z.string().min(9, "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง"),
  location: z.string().min(1, "กรุณาเลือกพื้นที่"),
  preferredRole: z.string().min(1, "กรุณาเลือกตำแหน่งที่ต้องการ"),
  salaryExpectation: z.number().min(1, "กรุณาระบุเงินเดือนที่คาดหวัง"),
  availability: z.string().min(1, "กรุณาระบุความพร้อมเริ่มงาน"),
  skills: z.array(z.string()).min(1, "เลือกอย่างน้อย 1 ทักษะ"),
  experienceYears: z.number().min(0, "กรุณาระบุประสบการณ์"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CandidateProfileInput = z.infer<typeof candidateProfileSchema>
