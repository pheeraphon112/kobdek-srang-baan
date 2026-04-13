import { ProfileForm } from "@/components/candidate/profile-form"
import { UserCircle } from "lucide-react"

export const metadata = {
  title: "สร้างโปรไฟล์ | JobMatching",
}

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <UserCircle className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-900">สร้างโปรไฟล์</h1>
          <p className="text-sm text-gray-500 mt-1">
            กรอกข้อมูลเพื่อเริ่มหางานที่ใช่
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}
