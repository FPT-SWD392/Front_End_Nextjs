import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetCreatedArtListRequest {
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
  description: string;
  ratingCount: number;
  averageRating: number;
  status: number;
}
export interface GetCreatedArtListResponse {
  currentPage: number;
  pageCount: number;
  artworkPreviews: ArtWork[];
}

export const GetCreatedArtList = async (params: GetCreatedArtListRequest, accessToken: string): Promise<GetCreatedArtListResponse> => {
  try {
    const res = await apiServerFetch(`/api/Art/GetCreatedArtList?page=${params.page}`, 'GET', undefined, accessToken);

    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', { artworkPreviews: [] });
  }
};
