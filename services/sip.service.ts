import { envestBackend } from ".";
import { SIP_URLS } from "../constants/Api";
import { SipList } from "../model/sip";

const SipServices = {
  getAllSips: async (userId: string): Promise<SipList | null> => {
    try {
      const response = await envestBackend.get(SIP_URLS.GET_SIP(userId));
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default SipServices;
