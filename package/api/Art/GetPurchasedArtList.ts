import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetPurchasedArtListRequest {
  page: number;
}

export interface ArtWork {
  artId: number;
  artName: string;
  price: number;
  creatorId: number;
  creatorNickName: string;
  creatorProfilePicture: string;
  tags: number[];
  ratingCount: number;
  averageRating: number;
  status: number;
}
export interface GetPurchasedArtListResponse {
  currentPage: number;
  pageCount: number;
  artworkPreviews: ArtWork[];
}

export const GetPurchasedArtList = async (params: GetPurchasedArtListRequest, accessToken: string): Promise<GetPurchasedArtListResponse> => {
  try {
    const res = await apiServerFetch(`/api/Art/GetPurchasedArtList?page=${params.page}`, 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', { artworkPreviews: [] });
  }
};
