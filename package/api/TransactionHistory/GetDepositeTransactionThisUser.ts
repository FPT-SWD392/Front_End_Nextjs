import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetTransactionHistoryRequest {}

export interface GetTransactionHistoryResponse extends TransactionHistory {}

export interface TransactionHistory {
  userId: number;
  transactionId: number;
  note: string;
  amount: number;
  isSuccess: boolean,
  transactionDate: string;
  transactionType: number;
}
export const GetTransactionHistory = async (params: GetTransactionHistoryRequest, accessToken: string): Promise<GetTransactionHistoryResponse[]> => {
  try {
    const res = await apiServerFetch('/api/TransactionHistory/GetDepositeTransactionThisUser', 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('', []);
  }
};
