export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: string[]; // Array of student IDs
}

export const parents: Parent[] = [
  {
    id: "1",
    name: "Karim Karimov",
    email: "karim.karimov@email.com",
    phone: "+998 90 111 22 33",
    children: ["1"], // Aziza Karimova
  },
  {
    id: "2",
    name: "Toshmat Toshmatov",
    email: "toshmat.toshmatov@email.com",
    phone: "+998 91 222 33 44",
    children: ["2"], // Bekzod Toshmatov
  },
  {
    id: "3",
    name: "Rakhim Rakhimov",
    email: "rakhim.rakhimov@email.com",
    phone: "+998 92 333 44 55",
    children: ["3"], // Dilfuza Rakhimova
  },
  {
    id: "4",
    name: "Umar Umarov",
    email: "umar.umarov@email.com",
    phone: "+998 93 444 55 66",
    children: ["4"], // Eldor Umarov
  },
  {
    id: "5",
    name: "Yusuf Yusupov",
    email: "yusuf.yusupov@email.com",
    phone: "+998 94 555 66 77",
    children: ["5"], // Fotima Yusupova
  },
];
