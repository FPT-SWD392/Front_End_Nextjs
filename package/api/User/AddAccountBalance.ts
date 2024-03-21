import { apiServerFetch, errorSystem } from '../api-fetch';

export interface AddAccountBalanceRequest {
  amount: number;
  transactionType: number;
  isSuccess: boolean;
}
export interface AddAccountBalanceResponse {}
export const AddAccountBalance = async (params: AddAccountBalanceRequest, accessToken: string): Promise<AddAccountBalanceResponse> => {
  try {
    const res = await apiServerFetch('/api/User/AddAccountBalanceUser', 'POST', params, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('', {});
  }
};
