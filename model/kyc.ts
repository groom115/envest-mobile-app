export interface GetKycStartUrlRequest {
    name: string;
    transactionId: string;
    workflowId: string;
}

export interface GetKycStartUrlResponse {
    startKycUrl: string;
}
