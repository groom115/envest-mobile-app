import { envestBackend } from "../api";
import { REFERRAL } from "../constants/Api";
import { Referral } from "../model/refer";

const ReferralService = {
  getReferralDetails: async (): Promise<Referral | null> => {
    try {
      const response = await envestBackend.get(REFERRAL.GET_REFERRAL_DETAILS());
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default ReferralService;
