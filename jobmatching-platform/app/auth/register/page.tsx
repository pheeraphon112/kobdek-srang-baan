import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata = {
  title: "สมัครสมาชิก | JobMatching",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">สมัครสมาชิก</h1>
          <p className="text-sm text-gray-500 mt-1">
            เริ่มต้นหางานหรือหาคนกับ JobMatching
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <RegisterForm />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            href="/auth/login"
            className="text-cyan-600 font-medium hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  )
}
