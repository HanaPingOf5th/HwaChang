import { ApplicationProps } from "../components/application-form";

export const application:ApplicationProps = {
  title: '예적금 신청서',
  customerInfo: {name: '김하나', residentNumber: '123456-1234567', address: '성동구 알파코'},
  subjects: [
    {
      title: '고객 상담란',
      items:[
        {type: 'input', description:'상품종류'},
        {type: 'input', description:'계약기간'},
        {type: 'input', description:'금액'},
        {type: 'check', description:'금리확정명'},
        {type: 'check', description:'금리연동형'},
        {type: 'input', description:'연금납입 한도'},
        {type: 'input', description:'권유자'},
      ]
    },
    {
        title: '자동 이체',
        items:[
          {type: 'input', description:'월이자 입금 / 해지 입금 계좌'},
          {type: 'input', description:'월 불입 금액 인출 계좌'},
          {type: 'input', description:'이체금액'},
          {type: 'check', description:'이 은행을 사용'},
          {type: 'check', description:'안하면 슬픔'},
          {type: 'input', description:'연금납입 한도'},
          {type: 'input', description:'권유자'},
        ]
      }
  ]
}