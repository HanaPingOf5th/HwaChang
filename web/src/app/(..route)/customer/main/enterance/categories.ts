import { FaMoneyBill, FaHeadset  } from "react-icons/fa";
import { AiFillFund, AiFillBank } from "react-icons/ai";
import { IoCardSharp, IoDocumentText } from "react-icons/io5";
import { MdOutlinePhoneIphone, MdVerified, MdAccountTree } from "react-icons/md";
import { FaHouse, FaPhone, FaThumbsUp } from "react-icons/fa6";
import { RiCriminalFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { HiCurrencyDollar } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
interface category{
  title: string;
  icon: IconType;
}
export const customerCategories:category[] = [
  {
    title: '예금',
    icon: FaMoneyBill
  },
  {
    title: '펀드/신택',
    icon: AiFillFund
  },
  {
    title: '카드',
    icon: IoCardSharp
  },
  {
    title: '보험',
    icon: IoDocumentText
  },
  {
    title: '대출',
    icon: AiFillBank
  },
  {
    title: '스마트 뱅킹',
    icon: MdOutlinePhoneIphone
  },
  {
    title: '인증서',
    icon: MdVerified
  },
  {
    title: '주택 청약',
    icon: FaHouse
  },
  {
    title: '텔레뱅킹',
    icon: FaPhone
  },
  {
    title: '금융 사기',
    icon: RiCriminalFill
  },
  {
    title: '자동 이체',
    icon: MdAccountTree
  },
  {
    title: '기타',
    icon: FaHeadset
  }
]

export const enterpriseCategories = [
  {
    title: '대출',
    icon: AiFillBank
  },
  {
    title: '외환',
    icon: HiCurrencyDollar
  },
  {
    title: '입출금 알림',
    icon: IoMdNotifications
  },
  {
    title: '펀드/신탁',
    icon: AiFillFund
  },
  {
    title: '오픈 뱅킹',
    icon: AiFillBank
  },
  {
    title: '예금',
    icon: FaMoneyBill
  },
  {
    title: '자동이체',
    icon: MdAccountTree
  },
  {
    title: '금융 사기',
    icon: RiCriminalFill
  },
  {
    title: '텔레뱅킹',
    icon: FaPhone
  },
  {
    title: '인증서',
    icon: MdVerified
  },
  {
    title: '우수 고객',
    icon: FaThumbsUp
  },
  {
    title: '기타',
    icon: FaHeadset
  }
]