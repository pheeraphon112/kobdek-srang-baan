import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "ข้อผิดพลาด | JobMatching",
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          เกิดข้อผิดพลาดในการเข้าสู่ระบบ
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          กรุณาลองใหม่อีกครั้ง หากยังมีปัญหา กรุณาติดต่อทีมงาน
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-700 transition-colors"
        >
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </div>
  )
}
