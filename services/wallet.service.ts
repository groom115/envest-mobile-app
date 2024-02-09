import { envestBackend } from "../api";

export const getInrWalletBalance = async (userId: string): Promise<number> => {
  try {
    const response = await envestBackend.get<GetWalletDataResponse>(
      `wallet/transactions/inr/balance?userid=${userId}`
    );

    return Number(response.data.walletBalance);
  } catch (error) {
    console.error(error);
    return 0;
  }
};
