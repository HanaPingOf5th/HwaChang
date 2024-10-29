interface SSTContent{
  speaker: string;
  text: string;
  time: string;
}

interface SttSummary {
  id: number;
  title: string;
  speakers: string[];
  contents: SSTContent[];
  date: string;
  mainTopics: string[];
}

interface AISummary {
  id: number;
  title: string;
  contents: string[];
  date: string;
  mainTopics: string[];
}

export const SummaryData:SttSummary = {
  id: 1,
  title: "상담 기록 예시",
  speakers: ["발화자1", "발화자2"],
  contents: [
    { speaker: "발화자1", text: "예금에 대해 알고 싶어요.", time: "00:01" },
    {
      speaker: "발화자2",
      text: "안녕하십니까 고객님. 예금은 크게 '자유입출금식예금'과 '정기예금'으로 나뉩니다.",
      time: "00:05",
    },
    {
      speaker: "발화자1",
      text: "감사합니다. 대출 상품도 설명해주세요.",
      time: "00:10",
    },
    {
      speaker: "발화자2",
      text: "대출 상품은 금융시장의 핵심 상품 중 하나로 볼 수 있습니다.",
      time: "00:15",
    },
  ],
  date: "2024-10-23",
  mainTopics: ["예금", "적금"],
}

export const AISummaryData: AISummary = {
  id: 1,
  title: "예금 및 적금 상담 요약",
  contents: [
    "고객1은 예금 상품에 대한 정보를 요청하였고, 상담사는 자유입출금식예금과 정기예금을 설명하였습니다.",
    "상담사는 대출 상품의 역할에 대해서도 설명하였습니다.",
  ],
  date: "2024-10-23",
  mainTopics: ["예금", "적금"],
}
