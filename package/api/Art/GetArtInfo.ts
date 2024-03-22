import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetArtInfoRequest {
  id: number;
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
export interface GetArtInfoResponse extends ArtWork{
}

export const GetArtInfo = async (params: GetArtInfoRequest): Promise<GetArtInfoResponse> => {
  try {
    const res = await apiServerFetch(`/api/Art/GetArtInfo?artId=${params.id}`, 'GET');
  
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', { artworkPreviews: [] });
  }
};
