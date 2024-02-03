import { envestBackend } from "../api";
import { GetKycStartUrlRequest, GetKycStartUrlResponse } from "../model/kyc";

export const getKycStartUrl = async (requestBody: GetKycStartUrlRequest): Promise<string | undefined> => {
    try {
        const res=await envestBackend.post<GetKycStartUrlResponse>('authentication/v1/profile/kyc/start', requestBody);

        return res.data.startKycUrl;
    } catch (error) {
        console.error(error);
    }
}
