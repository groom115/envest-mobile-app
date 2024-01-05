export interface Description {
  long: string;
  short: string;
}

export interface Image {
  small: string;
}

export interface MinInvestment {
  amount: number;
  currency: any;
}

export interface Returns {
  absolute: any;
  annualized: any;
  daily_return: number;
  index_value: number;
}

export interface Portfolio {
  id: string;
  name: string;
  constituents: [any];
  constituents_count: number;
  created_at: string;
  description: Description;
  image: Image;
  min_investment: MinInvestment;
  rank: number;
  returns: Returns;
  risk: string;
  slug: string;
  trend: string;
}

export interface ChartData {
  date: string;
  value: number;
}
