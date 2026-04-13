export const PREFERRED_ROLES = [
  { value: "chef", label: "เชฟ / พ่อครัว" },
  { value: "sous_chef", label: "ซูเชฟ" },
  { value: "cook", label: "กุ๊ก / ผู้ช่วยครัว" },
  { value: "barista", label: "บาริสต้า" },
  { value: "bartender", label: "บาร์เทนเดอร์" },
  { value: "server", label: "พนักงานเสิร์ฟ" },
  { value: "cashier", label: "แคชเชียร์" },
  { value: "reception", label: "พนักงานต้อนรับ" },
  { value: "housekeeping", label: "แม่บ้าน / Housekeeping" },
  { value: "manager", label: "ผู้จัดการ / หัวหน้า" },
  { value: "sommelier", label: "ซอมเมลิเยร์" },
  { value: "pastry_chef", label: "เชฟเบเกอรี่ / ขนม" },
  { value: "driver", label: "พนักงานขับรถ" },
  { value: "spa_therapist", label: "นักบำบัด / สปา" },
  { value: "other", label: "อื่นๆ" },
] as const

export const SKILLS = [
  { value: "thai_cooking", label: "อาหารไทย" },
  { value: "western_cooking", label: "อาหารตะวันตก" },
  { value: "japanese_cooking", label: "อาหารญี่ปุ่น" },
  { value: "chinese_cooking", label: "อาหารจีน" },
  { value: "pastry", label: "เบเกอรี่ / ขนม" },
  { value: "barista", label: "ชงกาแฟ" },
  { value: "bartending", label: "ผสมเครื่องดื่ม" },
  { value: "service", label: "งานบริการ" },
  { value: "pos_system", label: "ระบบ POS" },
  { value: "inventory", label: "จัดการสต็อก" },
  { value: "cleaning", label: "ทำความสะอาด" },
  { value: "laundry", label: "ซักรีด" },
  { value: "english", label: "ภาษาอังกฤษ" },
  { value: "chinese_lang", label: "ภาษาจีน" },
  { value: "driving", label: "ขับรถ" },
  { value: "first_aid", label: "ปฐมพยาบาล" },
] as const

export const PROVINCES = [
  "กรุงเทพมหานคร",
  "นนทบุรี",
  "ปทุมธานี",
  "สมุทรปราการ",
  "เชียงใหม่",
  "เชียงราย",
  "ภูเก็ต",
  "สุราษฎร์ธานี",
  "กระบี่",
  "ชลบุรี",
  "ระยอง",
  "ประจวบคีรีขันธ์",
  "ขอนแก่น",
  "นครราชสีมา",
  "อุดรธานี",
  "เพชรบุรี",
  "สงขลา",
  "สมุทรสาคร",
  "นครปฐม",
  "พังงา",
] as const

export const SALARY_OPTIONS = [
  { value: 10000, label: "10,000 บาท" },
  { value: 12000, label: "12,000 บาท" },
  { value: 15000, label: "15,000 บาท" },
  { value: 18000, label: "18,000 บาท" },
  { value: 20000, label: "20,000 บาท" },
  { value: 25000, label: "25,000 บาท" },
  { value: 30000, label: "30,000 บาท" },
  { value: 40000, label: "40,000 บาท" },
  { value: 50000, label: "50,000+ บาท" },
] as const

export const AVAILABILITY_OPTIONS = [
  { value: "ทันที", label: "พร้อมเริ่มทันที" },
  { value: "1_week", label: "ภายใน 1 สัปดาห์" },
  { value: "2_weeks", label: "ภายใน 2 สัปดาห์" },
  { value: "1_month", label: "ภายใน 1 เดือน" },
  { value: "negotiable", label: "แล้วแต่ตกลง" },
] as const

export const EXPERIENCE_OPTIONS = [
  { value: 0, label: "ไม่มีประสบการณ์" },
  { value: 1, label: "1 ปี" },
  { value: 2, label: "2 ปี" },
  { value: 3, label: "3 ปี" },
  { value: 5, label: "5 ปี" },
  { value: 7, label: "7 ปี" },
  { value: 10, label: "10+ ปี" },
] as const

export const BUSINESS_TYPES = [
  { value: "restaurant", label: "ร้านอาหาร" },
  { value: "hotel", label: "โรงแรม" },
  { value: "cafe", label: "คาเฟ่" },
  { value: "bar", label: "บาร์" },
  { value: "resort", label: "รีสอร์ท" },
  { value: "catering", label: "จัดเลี้ยง" },
  { value: "bakery", label: "เบเกอรี่" },
  { value: "spa", label: "สปา" },
  { value: "retail", label: "ค้าปลีก" },
  { value: "other", label: "อื่นๆ" },
] as const
