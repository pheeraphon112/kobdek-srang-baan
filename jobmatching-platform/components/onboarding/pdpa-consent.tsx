"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export function PDPAConsent() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAccept() {
    if (!checked) {
      toast.error("กรุณายอมรับนโยบายความเป็นส่วนตัว")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/pdpa", { method: "POST" })
      if (!res.ok) {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่")
        setLoading(false)
        return
      }

      await update({ pdpaConsent: true })
      toast.success("ยอมรับนโยบายเรียบร้อย")

      // Redirect based on role
      const role = session?.user?.role
      if (role === "CANDIDATE") {
        router.push("/candidate/profile/create")
      } else if (role === "EMPLOYER") {
        router.push("/employer/dashboard")
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
      router.refresh()
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <ShieldCheck className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-900">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            กรุณาอ่านและยอมรับก่อนใช้งาน
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto text-sm text-gray-600 leading-relaxed">
            <p className="font-medium text-gray-900 mb-2">
              พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </p>
            <p className="mb-2">
              JobMatching (&quot;แพลตฟอร์ม&quot;)
              เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>จัดหางานที่เหมาะสมกับความสามารถและความต้องการ</li>
              <li>แสดงโปรไฟล์แก่ผู้ประกอบการที่ท่านสมัครงาน</li>
              <li>ติดต่อสื่อสารเกี่ยวกับโอกาสงานและการอัปเดต</li>
              <li>ปรับปรุงระบบจับคู่งานให้แม่นยำยิ่งขึ้น</li>
            </ul>
            <p className="mb-2">
              ข้อมูลที่เก็บรวบรวมได้แก่: ชื่อ, อีเมล, เบอร์โทรศัพท์,
              พื้นที่ทำงาน, ประวัติการทำงาน, ทักษะ, ความคาดหวังด้านเงินเดือน
            </p>
            <p>
              ท่านสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลได้ตลอดเวลา
              โดยติดต่อทีมงานที่ support@jobmatching.app
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-700">
              ข้าพเจ้าได้อ่านและยอมรับนโยบายความเป็นส่วนตัว
              และยินยอมให้ JobMatching
              เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตามวัตถุประสงค์ข้างต้น
            </span>
          </label>

          <Button
            onClick={handleAccept}
            loading={loading}
            disabled={!checked}
            className="w-full"
            size="lg"
          >
            ยอมรับและดำเนินการต่อ
          </Button>
        </div>
      </div>
    </div>
  )
}
