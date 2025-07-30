export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  hireDate: string;
  salary: number;
  salaryHistory: SalaryRecord[];
}

export interface SalaryRecord {
  id: string;
  month: string;
  year: number;
  amount: number;
  paid: boolean;
  paidDate?: string;
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Malika Karimova",
    email: "malika.karimova@edu-lider.uz",
    subject: "Mathematics",
    phone: "+998 90 123 45 67",
    hireDate: "2020-09-01",
    salary: 2500000,
    salaryHistory: [
      {
        id: "1",
        month: "January",
        year: 2024,
        amount: 2500000,
        paid: true,
        paidDate: "2024-01-05",
      },
      {
        id: "2",
        month: "December",
        year: 2023,
        amount: 2500000,
        paid: true,
        paidDate: "2023-12-05",
      },
      {
        id: "3",
        month: "November",
        year: 2023,
        amount: 2500000,
        paid: true,
        paidDate: "2023-11-05",
      },
    ],
  },
  {
    id: "2",
    name: "Rustam Toshmatov",
    email: "rustam.toshmatov@edu-lider.uz",
    subject: "Physics",
    phone: "+998 91 234 56 78",
    hireDate: "2021-03-15",
    salary: 2200000,
    salaryHistory: [
      {
        id: "4",
        month: "January",
        year: 2024,
        amount: 2200000,
        paid: true,
        paidDate: "2024-01-05",
      },
      {
        id: "5",
        month: "December",
        year: 2023,
        amount: 2200000,
        paid: true,
        paidDate: "2023-12-05",
      },
      {
        id: "6",
        month: "November",
        year: 2023,
        amount: 2200000,
        paid: true,
        paidDate: "2023-11-05",
      },
    ],
  },
  {
    id: "3",
    name: "Dilbar Rakhimova",
    email: "dilbar.rakhimova@edu-lider.uz",
    subject: "Chemistry",
    phone: "+998 92 345 67 89",
    hireDate: "2019-08-20",
    salary: 2300000,
    salaryHistory: [
      {
        id: "7",
        month: "January",
        year: 2024,
        amount: 2300000,
        paid: true,
        paidDate: "2024-01-05",
      },
      {
        id: "8",
        month: "December",
        year: 2023,
        amount: 2300000,
        paid: true,
        paidDate: "2023-12-05",
      },
      {
        id: "9",
        month: "November",
        year: 2023,
        amount: 2300000,
        paid: true,
        paidDate: "2023-11-05",
      },
    ],
  },
  {
    id: "4",
    name: "Aziz Umarov",
    email: "aziz.umarov@edu-lider.uz",
    subject: "English",
    phone: "+998 93 456 78 90",
    hireDate: "2022-01-10",
    salary: 2000000,
    salaryHistory: [
      {
        id: "10",
        month: "January",
        year: 2024,
        amount: 2000000,
        paid: true,
        paidDate: "2024-01-05",
      },
      {
        id: "11",
        month: "December",
        year: 2023,
        amount: 2000000,
        paid: true,
        paidDate: "2023-12-05",
      },
      {
        id: "12",
        month: "November",
        year: 2023,
        amount: 2000000,
        paid: true,
        paidDate: "2023-11-05",
      },
    ],
  },
  {
    id: "5",
    name: "Zarina Yusupova",
    email: "zarina.yusupova@edu-lider.uz",
    subject: "Biology",
    phone: "+998 94 567 89 01",
    hireDate: "2021-11-05",
    salary: 2100000,
    salaryHistory: [
      {
        id: "13",
        month: "January",
        year: 2024,
        amount: 2100000,
        paid: true,
        paidDate: "2024-01-05",
      },
      {
        id: "14",
        month: "December",
        year: 2023,
        amount: 2100000,
        paid: true,
        paidDate: "2023-12-05",
      },
      {
        id: "15",
        month: "November",
        year: 2023,
        amount: 2100000,
        paid: true,
        paidDate: "2023-11-05",
      },
    ],
  },
];
