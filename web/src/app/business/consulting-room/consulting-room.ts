export interface ConsultingRoom {
  consultingRoomId?: string;
  tellerId?: string;
  tellerName?: string;
  tellerType?: number;
  customerId?: string;
  customerName?: string;
  categoryId?: string;
  originalText?: unknown;
  summary?: string;
  recordChat?: string[];
  voiceRecord?: string;
  title?: string;
  time?: string;
}