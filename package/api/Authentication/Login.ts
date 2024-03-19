import { apiServerFetch, errorSystem } from '../api-fetch';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  profilePictureUrl: string;
}

export const Login = async (params: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await apiServerFetch('/api/Authentication/Login', 'POST', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', { token: '' });
  }
};
