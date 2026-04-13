# Module 1 — Founder QA Checklist

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (if not exists)
cp .env.example .env.local
# Edit .env.local with your PostgreSQL credentials:
#   DATABASE_URL="postgresql://user:password@localhost:5432/jobmatching?schema=public"
#   NEXTAUTH_URL="http://localhost:3000"
#   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# 3. Run migration
npm run db:migrate

# 4. Seed test users
npm run db:seed

# 5. Start dev server
npm run dev
```

---

## Test User Credentials

| Role | Email | Password | PDPA | Profile |
|------|-------|----------|------|---------|
| ADMIN | admin@jobmatching.app | admin123 | Yes (seeded) | N/A |
| CANDIDATE | candidate@test.com | test1234 | Yes (seeded) | Complete (seeded) |
| EMPLOYER | employer@test.com | test1234 | Yes (seeded) | Complete (seeded) |

Fresh registration accounts (create during testing):

| Role | Suggested Email | Password |
|------|----------------|----------|
| CANDIDATE | newcandidate@test.com | test1234 |
| EMPLOYER | newemployer@test.com | test1234 |

---

## 1. End-to-End Flow Tests

### 1.1 Fresh Candidate Registration Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/auth/register` | Register page loads, role selector shows "หางาน" and "หาคน" |
| 2 | Select "หางาน" (CANDIDATE) | Card highlights cyan |
| 3 | Fill email, password (6+ chars), confirm password | No validation errors |
| 4 | Click "สมัครสมาชิก" | Loading spinner, then redirect to `/onboarding/pdpa` |
| 5 | Read PDPA text, check consent checkbox | Button becomes enabled |
| 6 | Click "ยอมรับและดำเนินการต่อ" | Toast "ยอมรับนโยบายเรียบร้อย", redirect to `/candidate/profile/create` |
| 7 | Fill all 8 fields (name, phone, location, role, salary, availability, skills, experience) | No validation errors |
| 8 | Click "สร้างโปรไฟล์" | Toast "สร้างโปรไฟล์เรียบร้อย!", redirect to `/candidate/dashboard` |
| 9 | Verify dashboard | Shows profile summary: name, role, location, salary, availability, experience, skills chips |

### 1.2 Fresh Employer Registration Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/auth/register` | Register page loads |
| 2 | Select "หาคน" (EMPLOYER) | Card highlights cyan |
| 3 | Fill email, password, confirm password | No validation errors |
| 4 | Click "สมัครสมาชิก" | Redirect to `/onboarding/pdpa` |
| 5 | Accept PDPA | Toast success, redirect to `/employer/dashboard` |
| 6 | Verify dashboard | Shows employer stub: "ระบบลงประกาศงานและจัดการผู้สมัครจะเปิดให้บริการใน Module 3" |

### 1.3 Admin Login Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/auth/login` | Login page loads |
| 2 | Enter admin@jobmatching.app / admin123 | No validation errors |
| 3 | Click "เข้าสู่ระบบ" | Redirect to `/admin/dashboard` |
| 4 | Verify dashboard | Shows admin stub: "จะเปิดให้บริการใน Module 6" |

### 1.4 Returning Candidate Login

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/auth/login` | Login page loads |
| 2 | Enter candidate@test.com / test1234 | No validation errors |
| 3 | Click "เข้าสู่ระบบ" | Redirect to `/candidate/dashboard` (skips PDPA + profile — already complete) |

### 1.5 Returning Employer Login

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/auth/login` | Login page loads |
| 2 | Enter employer@test.com / test1234 | No validation errors |
| 3 | Click "เข้าสู่ระบบ" | Redirect to `/employer/dashboard` (skips PDPA — already complete) |

---

## 2. Route-by-Route Test Scenarios

### Public Routes (no login required)

| Route | Test | Expected |
|-------|------|----------|
| `/` | Visit while logged out | Landing page with hero, 4 feature cards, login/register buttons |
| `/` | Visit while logged in | Redirect to role-based dashboard |
| `/auth/login` | Visit while logged out | Login form |
| `/auth/login` | Visit while logged in | Redirect to dashboard |
| `/auth/register` | Visit while logged out | Register form with role selector |
| `/auth/register` | Visit while logged in | Redirect to dashboard |
| `/auth/error` | Visit directly | Error page with "กลับไปหน้าเข้าสู่ระบบ" link |

### Protected Routes (login required)

| Route | Test | Expected |
|-------|------|----------|
| `/onboarding/pdpa` | Visit without login | Redirect to `/auth/login` |
| `/onboarding/pdpa` | Visit with PDPA already accepted | Redirect to dashboard |
| `/onboarding/pdpa` | Visit with PDPA not accepted | PDPA consent page loads |
| `/candidate/dashboard` | Visit as CANDIDATE with complete profile | Dashboard with profile summary |
| `/candidate/dashboard` | Visit as CANDIDATE without profile | Redirect to `/candidate/profile/create` |
| `/candidate/dashboard` | Visit as EMPLOYER | Redirect to `/employer/dashboard` |
| `/candidate/dashboard` | Visit as ADMIN | Allowed (ADMIN can access candidate routes) |
| `/candidate/profile/create` | Visit as CANDIDATE without profile | Profile form |
| `/candidate/profile/create` | Visit as EMPLOYER | Redirect to `/employer/dashboard` |
| `/employer/dashboard` | Visit as EMPLOYER | Employer stub dashboard |
| `/employer/dashboard` | Visit as CANDIDATE | Redirect to `/candidate/dashboard` |
| `/employer/dashboard` | Visit as ADMIN | Allowed (ADMIN can access employer routes) |
| `/admin/dashboard` | Visit as ADMIN | Admin stub dashboard |
| `/admin/dashboard` | Visit as CANDIDATE | Redirect to `/candidate/dashboard` |
| `/admin/dashboard` | Visit as EMPLOYER | Redirect to `/employer/dashboard` |

### API Routes (excluded from middleware)

| Route | Method | Test | Expected |
|-------|--------|------|----------|
| `/api/auth/register` | POST | Valid CANDIDATE data | 200, returns `{id, email, role}` |
| `/api/auth/register` | POST | Valid EMPLOYER data | 200, returns `{id, email, role}` |
| `/api/auth/register` | POST | Role = "ADMIN" | 400, `"Invalid role"` |
| `/api/auth/register` | POST | Duplicate email | 409, `"อีเมลนี้ถูกใช้งานแล้ว"` |
| `/api/auth/register` | POST | Password < 6 chars | 400, Zod error |
| `/api/auth/register` | POST | Mismatched passwords | 400, Zod error |
| `/api/auth/register` | POST | Invalid email format | 400, Zod error |
| `/api/pdpa` | POST | Logged in, no PDPA yet | 200, `{success: true}` |
| `/api/pdpa` | POST | Not logged in | 401, `"Unauthorized"` |
| `/api/candidate/profile` | POST | Logged in as CANDIDATE, valid 8 fields | 200, `{success: true}` |
| `/api/candidate/profile` | POST | Logged in as EMPLOYER | 403, `"Forbidden"` |
| `/api/candidate/profile` | POST | Not logged in | 401, `"Unauthorized"` |
| `/api/candidate/profile` | POST | Missing required fields | 400, Zod error |

---

## 3. Business Logic Validation

### Registration

- [ ] CANDIDATE and EMPLOYER are the only selectable roles from UI
- [ ] ADMIN role cannot be created via `/api/auth/register` (returns 400)
- [ ] ADMIN can only be created via database seed or direct DB access
- [ ] Duplicate email returns 409 error
- [ ] Password is hashed with bcrypt (12 rounds) — never stored as plaintext
- [ ] After registration, user is automatically signed in and redirected to PDPA

### PDPA Consent

- [ ] PDPA page shows full Thai legal text
- [ ] Checkbox must be checked before "ยอมรับ" button works
- [ ] Accepting PDPA sets `pdpaConsent=true` and `pdpaConsentAt` timestamp in DB
- [ ] After PDPA, CANDIDATE redirects to `/candidate/profile/create`
- [ ] After PDPA, EMPLOYER redirects to `/employer/dashboard`
- [ ] After PDPA, ADMIN redirects to `/admin/dashboard`
- [ ] User cannot revisit `/onboarding/pdpa` after accepting — redirects to dashboard

### Candidate Profile

- [ ] All 8 fields are required: fullName, phone, location, preferredRole, salaryExpectation, availability, skills (1+), experienceYears
- [ ] Submitting with empty fields shows Thai validation errors
- [ ] Phone validation: minimum 9 characters
- [ ] Skills: at least 1 must be selected (multi-select chips)
- [ ] After profile creation, `onboardingComplete=true` in CandidateProfile
- [ ] User's `name` and `phone` are also updated on the User record
- [ ] Dashboard shows all profile data correctly after creation

### Session & JWT

- [ ] JWT token contains: `id`, `role`, `pdpaConsent`, `profileComplete`
- [ ] Session update works after PDPA (client calls `update({ pdpaConsent: true })`)
- [ ] Session update works after profile creation (client calls `update({ profileComplete: true })`)
- [ ] Session persists across page refreshes (30-day maxAge)
- [ ] Logout clears session and redirects to `/`

### Navbar

- [ ] Logged out: shows "เข้าสู่ระบบ" and "สมัครสมาชิก" links
- [ ] Logged in: shows email, role badge, logout icon
- [ ] Logo links to dashboard when logged in, `/` when logged out
- [ ] Mobile hamburger menu works on small screens
- [ ] Logout button calls `signOut({ callbackUrl: "/" })`

---

## 4. Edge Cases

### Authentication Edge Cases

| # | Scenario | Expected |
|---|----------|----------|
| E1 | Login with wrong password | Toast: "อีเมลหรือรหัสผ่านไม่ถูกต้อง", stays on login page |
| E2 | Login with non-existent email | Same error as wrong password (no email enumeration) |
| E3 | Register with email that already exists | Toast: "อีเมลนี้ถูกใช้งานแล้ว" |
| E4 | Register with password "12345" (5 chars) | Validation error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" |
| E5 | Register with mismatched passwords | Validation error: "รหัสผ่านไม่ตรงกัน" |
| E6 | Submit login form with empty fields | Client-side validation: "กรุณากรอกอีเมล" / "กรุณากรอกรหัสผ่าน" |

### Middleware Edge Cases

| # | Scenario | Expected |
|---|----------|----------|
| E7 | New CANDIDATE tries to navigate to `/candidate/dashboard` before profile | Redirects to `/candidate/profile/create` |
| E8 | New user tries to navigate to any protected route before PDPA | Redirects to `/onboarding/pdpa` |
| E9 | EMPLOYER tries to access `/candidate/dashboard` via URL bar | Redirects to `/employer/dashboard` |
| E10 | CANDIDATE tries to access `/admin/dashboard` via URL bar | Redirects to `/candidate/dashboard` |
| E11 | Unauthenticated user visits `/candidate/dashboard` | Redirects to `/auth/login` |
| E12 | Logged-in user navigates to `/auth/login` via URL bar | Redirects to their dashboard |
| E13 | API call to `/api/pdpa` from user without PDPA | Returns 200 (not blocked by middleware — API routes excluded) |

### Profile Edge Cases

| # | Scenario | Expected |
|---|----------|----------|
| E14 | Submit profile form with 0 skills selected | Validation error: "เลือกอย่างน้อย 1 ทักษะ" |
| E15 | Submit profile without selecting experience | Validation error: "กรุณาเลือกประสบการณ์" |
| E16 | Phone number "0812345" (7 chars) | Validation error: "เบอร์โทรศัพท์ไม่ถูกต้อง" |
| E17 | Candidate re-submits profile (upsert) | Profile updated, not duplicated |

### Session Edge Cases

| # | Scenario | Expected |
|---|----------|----------|
| E18 | Clear cookies, visit protected route | Redirects to `/auth/login` |
| E19 | Two tabs open, logout in one | Other tab shows logged-out state on refresh |
| E20 | Complete PDPA, then navigate back with browser back button | Redirected away from PDPA page |

---

## 5. Regression Risks Before Module 2

These areas in Module 1 are most likely to break when Module 2 (Candidate Onboarding expansion) is built:

| Risk | Area | Why |
|------|------|-----|
| **Middleware guard ordering** | `middleware.ts` | Adding new onboarding steps may require new guards between PDPA and profile-complete. Guard order matters — inserting in wrong position can create redirect loops. |
| **JWT token payload** | `lib/auth.ts` | Adding new fields to JWT (e.g., `onboardingStep`) requires updating: type declarations, JWT callback, session callback, middleware reads. Missing any one breaks the chain. |
| **Profile upsert** | `/api/candidate/profile` | If Module 2 adds more profile fields, the Zod schema, API route, and form must all stay in sync. A mismatch causes silent data loss or validation errors. |
| **Session update pattern** | `components/candidate/profile-form.tsx` | `update({ profileComplete: true })` is called after profile creation. If Module 2 changes onboarding to multi-step, this flag may need to be set at a different point. |
| **CandidateProfile schema** | `prisma/schema.prisma` | Adding columns requires a new migration. Existing seeded profiles need the new columns to have defaults or be nullable, otherwise seed breaks. |
| **Redirect targets in PDPA** | `components/onboarding/pdpa-consent.tsx` | PDPA consent hardcodes redirect to `/candidate/profile/create`. If Module 2 adds steps before profile creation, this redirect must change. |
| **Seed data** | `prisma/seed.ts` | Seed creates profiles with `onboardingComplete: true`. If Module 2 adds new required fields, seed must be updated or it will fail/create incomplete profiles. |

### Pre-Module-2 Checklist

Before starting Module 2, verify:

- [ ] All E2E flows above still pass after Module 2 changes
- [ ] Seed still runs without errors
- [ ] Existing seeded users can still login and see dashboards
- [ ] Middleware doesn't create redirect loops with new routes
- [ ] JWT token shape is backward-compatible (existing JWTs still work)

---

## Quick Smoke Test (5 minutes)

Run these 5 tests to verify Module 1 is healthy:

1. **Fresh register**: Register a new CANDIDATE → PDPA → Profile → Dashboard
2. **Returning login**: Login as candidate@test.com → lands on dashboard
3. **Role guard**: While logged in as CANDIDATE, navigate to `/admin/dashboard` → redirected
4. **API guard**: While logged out, POST to `/api/pdpa` → 401
5. **Admin login**: Login as admin@jobmatching.app → lands on `/admin/dashboard`
