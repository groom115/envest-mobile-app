import { envestBackend } from ".";
import { InvestmentsApiUrls } from "../constants/Api";
import { transactionsData } from "../model/transaction";

const InvestmentOrderServices = {
    getAllInvestments: async (): Promise<transactionsData | null> => {
        try{
        const response = await envestBackend.get(InvestmentsApiUrls.GET_ORDER_DETAILS);
        return response.data;
        } catch(error) {
            console.log(error);
            return {};
        }
    }
}

export default InvestmentOrderServices;