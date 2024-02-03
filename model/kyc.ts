export interface GetKycStartUrlRequest {
    userName: string;
    transactionId: string;
    workflowId: string;
}

export interface GetKycStartUrlResponse {
    startKycUrl: string;
}
