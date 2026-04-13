import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "เข้าสู่ระบบ | JobMatching",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">เข้าสู่ระบบ</h1>
          <p className="text-sm text-gray-500 mt-1">
            ยินดีต้อนรับกลับมา
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/auth/register"
            className="text-cyan-600 font-medium hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  )
}
