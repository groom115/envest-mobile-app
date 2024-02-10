import { envestBackend } from "../api";
import { INVESTMENT_URLS } from "../constants/Api";
import { InvestmentOverview } from "../model/investment";
import { transactionsData } from "../model/transaction";

const InvestmentServices = {
  getAllInvestments: async (): Promise<transactionsData | null> => {
    try {
      const response = await envestBackend.get(
        INVESTMENT_URLS.GET_ORDER_DETAILS()
      );
      return response.data;
    } catch (error) {
      console.error();
      return {};
    }
  },
  getPersonalInvestmentOverview: async (
    userId: string
  ): Promise<InvestmentOverview | null> => {
    try {
      const response = await envestBackend.get(
        INVESTMENT_URLS.GET_INVESTMENTS_OVERVIEW(userId)
      );

      return response.data;
    } catch (error) {
      console.error();
      return null;
    }
  },
};

export default InvestmentServices;
