import { envestBackend } from "../api";
import { KYC_URLS } from "../constants/Api";
import { GetKycStartUrlRequest, GetKycStartUrlResponse } from "../model/kyc";

export const saveAndGetKycStartUrl = async (requestBody: GetKycStartUrlRequest): Promise<string | undefined> => {
    try {
        const res=await envestBackend.post<GetKycStartUrlResponse>(KYC_URLS.SAVE_AND_GET_KYC_URL(), requestBody);

        return res.data.startKycUrl;
    } catch (error) {
        console.error(error);
    }
}

export const getKycStartUrlFromDb = async (transactionId: string): Promise<string | undefined> => {
    try {
        const res=await envestBackend.get<GetKycStartUrlResponse>(KYC_URLS.GET_KYC_URL_FROM_DB(transactionId));

        return res.data.startKycUrl;
    } catch (error) {
        console.error(error);
    }
}
