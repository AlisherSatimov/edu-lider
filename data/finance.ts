export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  coinsUsed: number;
  coinsValue: number;
  finalAmount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
}

export interface Transaction {
  id: string;
  type: "payment" | "refund" | "coin_purchase" | "coin_redemption";
  amount: number;
  description: string;
  date: string;
  studentId?: string;
  studentName?: string;
}

export const payments: Payment[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Aziza Karimova",
    amount: 500000,
    coinsUsed: 50,
    coinsValue: 50000,
    finalAmount: 450000,
    date: "2024-01-15",
    status: "completed",
    description: "Monthly tuition fee - January 2024",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Bekzod Toshmatov",
    amount: 500000,
    coinsUsed: 0,
    coinsValue: 0,
    finalAmount: 500000,
    date: "2024-01-14",
    status: "completed",
    description: "Monthly tuition fee - January 2024",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Dilfuza Rakhimova",
    amount: 500000,
    coinsUsed: 100,
    coinsValue: 100000,
    finalAmount: 400000,
    date: "2024-01-13",
    status: "completed",
    description: "Monthly tuition fee - January 2024",
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Eldor Umarov",
    amount: 500000,
    coinsUsed: 25,
    coinsValue: 25000,
    finalAmount: 475000,
    date: "2024-01-12",
    status: "pending",
    description: "Monthly tuition fee - January 2024",
  },
  {
    id: "5",
    studentId: "5",
    studentName: "Fotima Yusupova",
    amount: 500000,
    coinsUsed: 150,
    coinsValue: 150000,
    finalAmount: 350000,
    date: "2024-01-11",
    status: "completed",
    description: "Monthly tuition fee - January 2024",
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 450000,
    description: "Payment from Aziza Karimova",
    date: "2024-01-15",
    studentId: "1",
    studentName: "Aziza Karimova",
  },
  {
    id: "2",
    type: "payment",
    amount: 500000,
    description: "Payment from Bekzod Toshmatov",
    date: "2024-01-14",
    studentId: "2",
    studentName: "Bekzod Toshmatov",
  },
  {
    id: "3",
    type: "coin_redemption",
    amount: -50000,
    description: "Coin redemption by Aziza Karimova",
    date: "2024-01-15",
    studentId: "1",
    studentName: "Aziza Karimova",
  },
  {
    id: "4",
    type: "coin_redemption",
    amount: -100000,
    description: "Coin redemption by Dilfuza Rakhimova",
    date: "2024-01-13",
    studentId: "3",
    studentName: "Dilfuza Rakhimova",
  },
  {
    id: "5",
    type: "coin_redemption",
    amount: -150000,
    description: "Coin redemption by Fotima Yusupova",
    date: "2024-01-11",
    studentId: "5",
    studentName: "Fotima Yusupova",
  },
];
