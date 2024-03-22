import { apiServerFetch, errorSystem } from '../api-fetch';

export interface PurchaseWithBalanceRequest {
  artId: string;
}

export interface PurchaseWithBalanceResponse {}

export const PurchaseWithBalance = async (params: PurchaseWithBalanceRequest, accessToken: string): Promise<PurchaseWithBalanceResponse> => {
  try {
    const res = await apiServerFetch('/api/Art/PurchaseWithBalance/' + params.artId, 'POST', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Giao dich thất bại', {});
  }
};
