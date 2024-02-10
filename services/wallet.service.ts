import { envestBackend } from "../api";
import { WALLET_URLS } from "../constants/Api";
import { GetWalletDataResponse } from "../model/wallet";

export const getInrWalletBalance = async (userId: string): Promise<number> => {
  try {
    const response = await envestBackend.get<GetWalletDataResponse>(
      WALLET_URLS.GET_INR_WALLET_BALANCE(userId)
    );

    return Number(response.data.walletBalance);
  } catch (error) {
    console.error(error);
    return 0;
  }
};
