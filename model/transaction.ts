export type Transaction = {
  amount: number;
  completeOrderStatus: string;
  completeOrderStatusDescription: string;
  constituents: [];
  constituentsCount: number;
  createdAt: string;
  currentStatus: string;
  fees: [];
  investedAmount: number;
  orderCategory: string;
  orderId: string;
  platformName: string;
  portfolioId: string;
  sellingPrice: number;
  soldTime: string;
  totalOrderValue: number;
  userid: string;
};

export type transactionsData = {
  transactions?: Transaction[];
};

export interface detailsProp {
  "Order ID": string;
  "Order Status": string;
  "Portfolio ID": string;
  "Order Type": string;
  "Time and Date": string;
}
export interface holdingProp {
  Coins: any;
  "Avg. Buy Price": any;
  Units: any;
}
export interface chargesProp {
  "Expense Ratio (deducted on rebalance)": string;
  "TDS (applicable only on sell orders)": string;
  "Taker + Maker fee": string;
  "Order Amount": string;
}
