import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetArtListRequest {
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
export interface GetArtListResponse {
  currentPage: number;
  pageCount: number;
  artworkPreviews: ArtWork[];
}

export const GetArtList = async (params: GetArtListRequest): Promise<GetArtListResponse> => {
  try {
    const res = await apiServerFetch(`/api/Art/GetArtList?page=${params.page}`, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', { artworkPreviews: [] });
  }
};
