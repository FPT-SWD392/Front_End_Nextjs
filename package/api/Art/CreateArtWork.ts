import { apiServerFetch, apiServerSubmitForm, errorSystem } from '../api-fetch';

export interface CreateArtWorkResponse {}

export const CreateArtWork = async (e: any, accessToken: string): Promise<CreateArtWorkResponse> => {
  try {
    const formData = new FormData(e.target);
    formData.append('Name', '1');
    formData.append('Description', '1');
    formData.append('Price', '1');
    formData.append('ArtStatus', '0');
    formData.append('Tags', [1, 2, 3].toString());

    const res = await apiServerSubmitForm('/api/Art/CreateArtWork', 'POST', formData, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    console.log(res)
    return res;
  } catch (error: any) {
    return errorSystem('Tạo thất bại', {});
  }
};
