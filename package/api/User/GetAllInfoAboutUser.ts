import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetCurrentUserRequest {}

export interface GetCurrentUserResponse {
  userId: number;
  email: string;
  status: number;
  creatorId: string;
  fullName: string;
  bio: string;
  contactInfo: string;
  location: string;
  phoneNumber: string;
  profilePicture: string;
  nickName: string;
  joinDate: string;
  balance: number;
  creatorInfo: null;
  reports: null;
  postLikes: null;
  purchases: null;
  transactionHistory: null;
  artRatings: null;
  commissions: null;
  follows: null;
}

export const GetCurrentUser = async (params: GetCurrentUserRequest, accessToken: string): Promise<GetCurrentUserResponse> => {
  try {
    const res = await apiServerFetch('/api/User/GetAllInfoAboutUser', 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', { token: '' });
  }
};
