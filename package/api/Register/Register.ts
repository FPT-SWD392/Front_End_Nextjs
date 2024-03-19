import { apiServerFetch, errorSystem } from '../api-fetch';

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  location: string;
  phoneNumber: string;
  nickName: string;
}

export interface RegisterResponse {
  errorEmail: string;
  errorPassword: string;
  errorPhoneNumber: string;
  errorNickName: string;
  isSuccess: boolean;
}

export const Register = async (params: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const res = await apiServerFetch('/api/Register/Register', 'POST', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Đăng kí', {});
  }
};
