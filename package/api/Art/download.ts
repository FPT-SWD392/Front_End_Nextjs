import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetArtInfoRequest {
  id: number;
}

export interface ArtWork {
  artId: number;

}
export interface GetArtInfoResponse extends ArtWork {}

export const GetArtUrl = async (params: GetArtInfoRequest, accessToken: string): Promise<string> => {
  try {
    const res = await fetch(`https://projectswd392.azurewebsites.net/api/Art/Download?artId=${params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error: any) {
    return '';
  }
};
