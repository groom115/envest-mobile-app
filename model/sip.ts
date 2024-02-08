export interface SipList {
  data: Sip[];
}

export interface Sip {
  amount: number;
  createdAt: string;
  orderCategory: string;
  portfolioId: string;
  sipId: string;
  sipSchedule: number;
  status: string;
  type: string;
  userId: string;
}
