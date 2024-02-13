export const INVESTMENT_URLS = {
  GET_INVESTMENTS_OVERVIEW: (userId: string) =>
    `/p&L/personal/get?userid=${userId}`,
  GET_SUCCESSFUL_INVESTMENTS: (userId: string) =>
    `/orders/v1/investments/success?userid=${userId}`,
  GET_PENDING_INVESTMENTS: (userId: string) =>
    `/orders/v1/investments/pending?userid=${userId}`,
  GET_FAILED_INVESTMENTS: (userId: string) =>
    `/orders/v1/investments/failed?userid=${userId}`,
  GET_ORDER_DETAILS: () => "/orders/v1/investments/",
};

export const SIP_URLS = {
  START_SIP: () => "/sip/create",
  GET_SIP: (userId: string) => `/sip/user?userid=${userId}`,
  EDIT_SIP: () => "/sip/edit",
};

export const REFERRAL = {
  GET_REFERRAL_DETAILS: () => "/referral/details",
  SEND_REFERRAL: () => "/referral/referrer/save",
};
export const KYC_URLS = {
  SAVE_AND_GET_KYC_URL: () => "authentication/v1/profile/kyc/start",
  GET_KYC_URL_FROM_DB: (transactionId: string) =>
    `authentication/v1/profile/kyc/start?transactionId=${transactionId}`,
};

export const WALLET_URLS = {
  GET_INR_WALLET_BALANCE: (userId: string) =>
    `wallet/transactions/inr/balance?userid=${userId}`,
};
