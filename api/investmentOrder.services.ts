import { envestBackend } from ".";
import { InvestmentsApiUrls } from "../constants/Api";

const InvestmentOrderServices = {
    getAllInvestments: () => {
        return envestBackend.get(InvestmentsApiUrls.GET_ORDER_DETAILS)
    }
}

export default InvestmentOrderServices;