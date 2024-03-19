import { apiServerFetch, errorSystem } from '../api-fetch';

export interface UserManageProfileRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UserManageProfileResponse {}

export const UpdateProfilePassword = async (params: UserManageProfileRequest, accessToken: string): Promise<UserManageProfileResponse> => {
  try {
    const res = await apiServerFetch(
      `/api/User/UpdateProfilePassword?oldPassword=${params.oldPassword}&newPassword=${params.newPassword}`,
      'PUT',
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    console.log(error);
    return errorSystem('Cập nhật thông tin thất bại', {});
  }
};
