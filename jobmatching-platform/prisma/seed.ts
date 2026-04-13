import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // ── Admin user (only way to create ADMIN) ──
  const adminPassword = await bcrypt.hash("admin123", 12)
  await prisma.user.upsert({
    where: { email: "admin@jobmatching.app" },
    update: {},
    create: {
      email: "admin@jobmatching.app",
      hashedPassword: adminPassword,
      name: "Admin",
      role: "ADMIN",
      pdpaConsent: true,
      pdpaConsentAt: new Date(),
    },
  })
  console.log("  ✓ Admin user created: admin@jobmatching.app / admin123")

  // ── Test candidate (with completed profile) ──
  const candidatePassword = await bcrypt.hash("test1234", 12)
  const candidate = await prisma.user.upsert({
    where: { email: "candidate@test.com" },
    update: {},
    create: {
      email: "candidate@test.com",
      hashedPassword: candidatePassword,
      name: "ทดสอบ ผู้สมัคร",
      phone: "0812345678",
      role: "CANDIDATE",
      pdpaConsent: true,
      pdpaConsentAt: new Date(),
    },
  })

  await prisma.candidateProfile.upsert({
    where: { userId: candidate.id },
    update: {},
    create: {
      userId: candidate.id,
      fullName: "ทดสอบ ผู้สมัคร",
      phone: "0812345678",
      location: "กรุงเทพมหานคร",
      preferredRole: "barista",
      salaryExpectation: 15000,
      availability: "ทันที",
      skills: ["barista", "service", "english"],
      experienceYears: 2,
      onboardingComplete: true,
    },
  })
  console.log("  ✓ Test candidate created: candidate@test.com / test1234")

  // ── Test employer (with completed profile) ──
  const employerPassword = await bcrypt.hash("test1234", 12)
  const employer = await prisma.user.upsert({
    where: { email: "employer@test.com" },
    update: {},
    create: {
      email: "employer@test.com",
      hashedPassword: employerPassword,
      name: "ร้านกาแฟทดสอบ",
      phone: "0899876543",
      role: "EMPLOYER",
      pdpaConsent: true,
      pdpaConsentAt: new Date(),
    },
  })

  await prisma.employerProfile.upsert({
    where: { userId: employer.id },
    update: {},
    create: {
      userId: employer.id,
      companyName: "Test Coffee Shop",
      businessType: "cafe",
      location: "กรุงเทพมหานคร",
      contactName: "คุณทดสอบ",
      phone: "0899876543",
      isVerified: false,
      onboardingComplete: true,
    },
  })
  console.log("  ✓ Test employer created: employer@test.com / test1234")

  console.log("\nSeed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
