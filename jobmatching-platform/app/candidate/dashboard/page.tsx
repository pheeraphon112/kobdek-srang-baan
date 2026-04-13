import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Briefcase, MapPin, Banknote, Clock, Star } from "lucide-react"

export const metadata = {
  title: "หน้าหลัก | JobMatching",
}

export default async function CandidateDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/login")

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile?.onboardingComplete) {
    redirect("/candidate/profile/create")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            สวัสดี, {profile.fullName} 👋
          </h1>
          <p className="text-sm text-gray-500">ยินดีต้อนรับสู่ JobMatching</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h2 className="font-medium text-gray-900 mb-4">โปรไฟล์ของคุณ</h2>
          <div className="space-y-3 text-sm">
            <ProfileRow
              icon={<Briefcase className="h-4 w-4 text-cyan-600" />}
              label="ตำแหน่ง"
              value={profile.preferredRole}
            />
            <ProfileRow
              icon={<MapPin className="h-4 w-4 text-cyan-600" />}
              label="พื้นที่"
              value={profile.location}
            />
            <ProfileRow
              icon={<Banknote className="h-4 w-4 text-cyan-600" />}
              label="เงินเดือน"
              value={`${profile.salaryExpectation.toLocaleString()} บาท/เดือน`}
            />
            <ProfileRow
              icon={<Clock className="h-4 w-4 text-cyan-600" />}
              label="พร้อมเริ่ม"
              value={profile.availability}
            />
            <ProfileRow
              icon={<Star className="h-4 w-4 text-cyan-600" />}
              label="ประสบการณ์"
              value={`${profile.experienceYears} ปี`}
            />
          </div>
          {profile.skills.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">ทักษะ</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs bg-cyan-50 text-cyan-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-cyan-50 rounded-2xl border border-cyan-100 p-6 text-center">
          <p className="text-sm text-cyan-700 font-medium mb-1">
            ระบบกำลังพัฒนา
          </p>
          <p className="text-xs text-cyan-600">
            ฟีดงานและระบบจับคู่จะเปิดให้บริการเร็วๆ นี้
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span className="text-gray-400 w-16">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  )
}
