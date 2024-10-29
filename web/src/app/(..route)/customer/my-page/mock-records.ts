 export interface ConsultingRecord{
  id: number,
  title: string,
  consultant: string,
  cartegoryType: '기업'|'개인',
  cartegory: string,
  date: string,

 }
 export const records:  ConsultingRecord[] = [
  {
    id: 1,
    title: "제목 1",
    consultant: "김동은",
    cartegoryType: "기업",
    cartegory: "예금 관리",
    date: "2024.10.22",
  },
  {
    id: 2,
    title: "제목 123",
    consultant: "김동은",
    cartegoryType: "기업",
    cartegory: "예금 관리",
    date: "2024.10.22",
  },
  {
    id: 3,
    title: "제목 11",
    consultant: "김동은",
    cartegoryType: "기업",
    cartegory: "예금 관리",
    date: "2024.10.22",
  },
  {
    id: 4,
    title: "제목 12",
    consultant: "김동은",
    cartegoryType: "기업",
    cartegory: "예금 관리",
    date: "2024.10.22",
  },
  
];