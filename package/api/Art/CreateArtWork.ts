import { apiServerFetch, apiServerSubmitForm, errorSystem } from '../api-fetch';

export interface CreateArtWorkRequest {
  name: string;
  description: string;
  price: number;
  tags: string[];
}
export interface CreateArtWorkResponse {
  error?: string
}

export const CreateArtWork = async (params: CreateArtWorkRequest, e: any, accessToken: string): Promise<CreateArtWorkResponse> => {
  try {
    const formData = new FormData(e.target);
    formData.append('Name', params.name);
    formData.append('Description', params.description);
    formData.append('Price', params.price + "");
    params.tags.forEach((e) => {
      formData.append('Tags', e.toString());
    })

    const res = await apiServerSubmitForm('/api/Art/CreateArtWork', 'POST', formData, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Tạo thất bại', {});
  }
};
