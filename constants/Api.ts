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
