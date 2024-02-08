export interface InvestmentOverview {
  e31: InvestmentConstituents;
  e32: InvestmentConstituents;
  totalCurrentAmount: number;
  totalInvestedAmount: number;
}

export interface InvestmentConstituents {
  constituents: any;
  currentAmount: number;
  investedAmount: number;
}
