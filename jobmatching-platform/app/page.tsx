import Link from "next/link"
import { Briefcase, Users, Zap, ShieldCheck } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="px-4 py-16 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          หางาน <span className="text-cyan-600">Hospitality</span>
          <br />
          ที่ใช่สำหรับคุณ
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          แพลตฟอร์มจับคู่งานร้านอาหาร โรงแรม คาเฟ่ และบริการ
          สำหรับคนไทยที่ต้องการโอกาสที่ดีกว่า
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-700 transition-colors"
          >
            เริ่มต้นใช้งาน
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-white transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Briefcase className="h-6 w-6 text-cyan-600" />}
            title="งาน Hospitality"
            description="ร้านอาหาร โรงแรม คาเฟ่ บาร์ รีสอร์ท และอีกมากมาย"
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-orange-500" />}
            title="จับคู่อัจฉริยะ"
            description="ระบบจับคู่งานตามทักษะ ประสบการณ์ และพื้นที่ของคุณ"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-cyan-600" />}
            title="เครือข่าย 192K+"
            description="ชุมชนคนทำงาน Hospitality ที่ใหญ่ที่สุดในไทย"
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
            title="ปลอดภัย PDPA"
            description="ข้อมูลของคุณได้รับการคุ้มครองตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        <p>&copy; 2026 JobMatching. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="mb-3">{icon}</div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}
