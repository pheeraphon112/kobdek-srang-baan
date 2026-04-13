import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Building2 } from "lucide-react"

export const metadata = {
  title: "Employer Dashboard | JobMatching",
}

export default async function EmployerDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")
  if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            สวัสดี, ผู้ประกอบการ 👋
          </h1>
          <p className="text-sm text-gray-500">Employer Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <Building2 className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
          <h2 className="font-medium text-gray-900 mb-2">
            ระบบผู้ประกอบการ
          </h2>
          <p className="text-sm text-gray-500">
            ระบบลงประกาศงานและจัดการผู้สมัครจะเปิดให้บริการใน Module 3
          </p>
        </div>
      </div>
    </div>
  )
}
