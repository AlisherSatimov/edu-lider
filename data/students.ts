export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  parentId: string;
  coinBalance: number;
  attendance: AttendanceRecord[];
  testResults: TestResult[];
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  subject: string;
}

export interface TestResult {
  id: string;
  subject: string;
  testName: string;
  score: number;
  maxScore: number;
  date: string;
}

export const students: Student[] = [
  {
    id: "1",
    name: "Aziza Karimova",
    email: "aziza.karimova@edu-lider.uz",
    grade: "10",
    class: "A",
    parentId: "1",
    coinBalance: 150,
    attendance: [
      {
        id: "1",
        date: "2024-01-15",
        status: "present",
        subject: "Mathematics",
      },
      { id: "2", date: "2024-01-15", status: "present", subject: "Physics" },
      { id: "3", date: "2024-01-16", status: "late", subject: "Chemistry" },
    ],
    testResults: [
      {
        id: "1",
        subject: "Mathematics",
        testName: "Algebra Test",
        score: 85,
        maxScore: 100,
        date: "2024-01-10",
      },
      {
        id: "2",
        subject: "Physics",
        testName: "Mechanics Quiz",
        score: 92,
        maxScore: 100,
        date: "2024-01-12",
      },
    ],
  },
  {
    id: "2",
    name: "Bekzod Toshmatov",
    email: "bekzod.toshmatov@edu-lider.uz",
    grade: "11",
    class: "B",
    parentId: "2",
    coinBalance: 75,
    attendance: [
      {
        id: "4",
        date: "2024-01-15",
        status: "present",
        subject: "Mathematics",
      },
      { id: "5", date: "2024-01-15", status: "absent", subject: "Physics" },
      { id: "6", date: "2024-01-16", status: "present", subject: "Chemistry" },
    ],
    testResults: [
      {
        id: "3",
        subject: "Mathematics",
        testName: "Algebra Test",
        score: 78,
        maxScore: 100,
        date: "2024-01-10",
      },
      {
        id: "4",
        subject: "Physics",
        testName: "Mechanics Quiz",
        score: 88,
        maxScore: 100,
        date: "2024-01-12",
      },
    ],
  },
  {
    id: "3",
    name: "Dilfuza Rakhimova",
    email: "dilfuza.rakhimova@edu-lider.uz",
    grade: "9",
    class: "A",
    parentId: "3",
    coinBalance: 200,
    attendance: [
      {
        id: "7",
        date: "2024-01-15",
        status: "present",
        subject: "Mathematics",
      },
      { id: "8", date: "2024-01-15", status: "present", subject: "Physics" },
      { id: "9", date: "2024-01-16", status: "excused", subject: "Chemistry" },
    ],
    testResults: [
      {
        id: "5",
        subject: "Mathematics",
        testName: "Geometry Test",
        score: 95,
        maxScore: 100,
        date: "2024-01-10",
      },
      {
        id: "6",
        subject: "Physics",
        testName: "Electricity Quiz",
        score: 89,
        maxScore: 100,
        date: "2024-01-12",
      },
    ],
  },
  {
    id: "4",
    name: "Eldor Umarov",
    email: "eldor.umarov@edu-lider.uz",
    grade: "10",
    class: "B",
    parentId: "4",
    coinBalance: 50,
    attendance: [
      { id: "10", date: "2024-01-15", status: "late", subject: "Mathematics" },
      { id: "11", date: "2024-01-15", status: "present", subject: "Physics" },
      { id: "12", date: "2024-01-16", status: "present", subject: "Chemistry" },
    ],
    testResults: [
      {
        id: "7",
        subject: "Mathematics",
        testName: "Algebra Test",
        score: 72,
        maxScore: 100,
        date: "2024-01-10",
      },
      {
        id: "8",
        subject: "Physics",
        testName: "Mechanics Quiz",
        score: 81,
        maxScore: 100,
        date: "2024-01-12",
      },
    ],
  },
  {
    id: "5",
    name: "Fotima Yusupova",
    email: "fotima.yusupova@edu-lider.uz",
    grade: "11",
    class: "A",
    parentId: "5",
    coinBalance: 300,
    attendance: [
      {
        id: "13",
        date: "2024-01-15",
        status: "present",
        subject: "Mathematics",
      },
      { id: "14", date: "2024-01-15", status: "present", subject: "Physics" },
      { id: "15", date: "2024-01-16", status: "present", subject: "Chemistry" },
    ],
    testResults: [
      {
        id: "9",
        subject: "Mathematics",
        testName: "Algebra Test",
        score: 98,
        maxScore: 100,
        date: "2024-01-10",
      },
      {
        id: "10",
        subject: "Physics",
        testName: "Mechanics Quiz",
        score: 94,
        maxScore: 100,
        date: "2024-01-12",
      },
    ],
  },
];
