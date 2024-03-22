import { apiServerFetch, errorSystem } from '../api-fetch';

export interface UpdateCreatorRequest {
  bio: string;
  contactInfo: string;
}
export interface UpdateCreatorResponse {
  error?: string;
}

export const UpdateCreator = async (params: UpdateCreatorRequest, accessToken: string): Promise<UpdateCreatorResponse> => {
  try {
    const res = await fetch('https://projectswd392.azurewebsites.net/api/CreatorInfo/UpgradeToCreatorWithBalance', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    });
    if (res.status !== 200) {
      throw new Error('');
    }
    let data: any = {};
    try {
      data = await res.json();
    } catch (error) {}
    return data;
  } catch (error: any) {
    return errorSystem('Lỗi không thể tạo yêu cầu', {});
  }
};
