import { apiServerFetch, errorSystem } from '../api-fetch';

export interface UserManageProfileRequest {
  FullName: string;
  Location: string;
  PhoneNumber: string;
  NickName: string;
}

export interface UserManageProfileResponse {}

export const UserManageProfile = async (params: UserManageProfileRequest, accessToken: string): Promise<UserManageProfileResponse> => {
  try {
    const res = await apiServerFetch(
      `/api/User/UserManageProfile?FullName=${params.FullName}&Location=${params.Location}&PhoneNumber=${params.PhoneNumber}&NickName=${params.NickName}`,
      'PUT',
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    console.log(error)
    return errorSystem('Đăng nhập thất bại', { });
  }
};
