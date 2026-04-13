import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { candidateProfileSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "CANDIDATE") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const parsed = candidateProfileSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Update user name and phone
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: data.fullName, phone: data.phone },
    })

    // Upsert candidate profile
    await prisma.candidateProfile.upsert({
      where: { userId: session.user.id },
      update: {
        ...data,
        onboardingComplete: true,
      },
      create: {
        userId: session.user.id,
        ...data,
        onboardingComplete: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    )
  }
}
