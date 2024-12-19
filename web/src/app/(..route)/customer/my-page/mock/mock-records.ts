import ProfileImg from "@/app/utils/public/lalalping.png";
export interface ConsultingRecord {
  id: number;
  summary: string;
  tellerName: string;
  type: string;
  category: string;
  date: string;
  image: JSX.Element;
}

export const records: ConsultingRecord[] = [
  {
    id: 1,
    summary: "제목 1",
    tellerName: "김동은",
    type: "기업",
    category: "예금 관리",
    date: "2024.10.22",
    image: ProfileImg as unknown as JSX.Element,
  },
  {
    id: 2,
    summary: "제목 123",
    tellerName: "김동은",
    type: "기업",
    category: "예금 관리",
    date: "2024.10.22",
    image: ProfileImg as unknown as JSX.Element,
  },
  {
    id: 3,
    summary: "제목 11",
    tellerName: "김동은",
    type: "기업",
    category: "예금 관리",
    date: "2024.10.22",
    image: ProfileImg as unknown as JSX.Element,
  },
  {
    id: 4,
    summary: "제목 12",
    tellerName: "김동은",
    type: "기업",
    category: "예금 관리",
    date: "2024.10.22",
    image: ProfileImg as unknown as JSX.Element,
  },
];
