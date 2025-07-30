export const USER_ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: "Administrator",
  [USER_ROLES.TEACHER]: "Teacher",
  [USER_ROLES.STUDENT]: "Student",
  [USER_ROLES.PARENT]: "Parent",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  EXCUSED: "excused",
} as const;

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const ATTENDANCE_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: "Present",
  [ATTENDANCE_STATUS.ABSENT]: "Absent",
  [ATTENDANCE_STATUS.LATE]: "Late",
  [ATTENDANCE_STATUS.EXCUSED]: "Excused",
} as const;

export const ATTENDANCE_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: "bg-green-100 text-green-800 border-green-200",
  [ATTENDANCE_STATUS.ABSENT]: "bg-red-100 text-red-800 border-red-200",
  [ATTENDANCE_STATUS.LATE]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [ATTENDANCE_STATUS.EXCUSED]: "bg-blue-100 text-blue-800 border-blue-200",
} as const;

export const NAVIGATION_ITEMS = {
  [USER_ROLES.ADMIN]: [
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/students", label: "Students", icon: "Users" },
    { href: "/teachers", label: "Teachers", icon: "GraduationCap" },
    { href: "/finance", label: "Finance", icon: "DollarSign" },
    { href: "/evaluation", label: "Evaluation", icon: "BarChart3" },
    { href: "/coinshop", label: "Coin Shop", icon: "Coins" },
  ],
  [USER_ROLES.TEACHER]: [
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/students", label: "Students", icon: "Users" },
    { href: "/evaluation", label: "Evaluation", icon: "BarChart3" },
  ],
  [USER_ROLES.STUDENT]: [
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/evaluation", label: "Evaluation", icon: "BarChart3" },
    { href: "/coinshop", label: "Coin Shop", icon: "Coins" },
  ],
  [USER_ROLES.PARENT]: [
    { href: "/parent", label: "Parent Portal", icon: "Home" },
  ],
} as const;

export const COIN_RATE = 1000; // 1 coin = 1000 UZS
