export interface ConsultingRoom {
  consultingRoomId?: string;
  tellerId?: string;
  customerIds?: string[];
  categoryId?: string;
  originalText?: unknown;
  summary?: string;
  recordChat?: string[];
  voiceRecord?: string;
  title?: string;
  time?: string;
}