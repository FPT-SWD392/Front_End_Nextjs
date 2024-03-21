import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserToken, setUserToken } from '../../../../package/cookies/token';
import { Login } from '../../../../package/api/Authentication/Login';
import { errorSystem } from '../../../../package/api/api-fetch';
import { UserManageProfile } from '../../../../package/api/User/UserManageProfile';
import { UpdateProfilePassword } from '../../../../package/api/User/UpdateProfilePassword';
import { Register } from '../../../../package/api/Authentication/Register';
import { AddAccountBalance } from '../../../../package/api/User/AddAccountBalance';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const params = await req.json();
  const userToken = await getUserToken(cookies());
  const path = searchParams.get('path') as string;
  const data = await response(params, userToken, path);
  return NextResponse.json(data);
}

const response = async (params: any, userToken: string, path: string) => {
  try {
    let res: any = {};
    switch (path) {
      case 'login':
        res = await Login(params);
        if (res.token === '') {
          throw new Error('Sai tài khoản hoặc mật khẩu');
        }
        setUserToken(res.token, cookies());
        break;
      case 'manage-profile':
        res = await UserManageProfile(params, userToken);
        break;
      case 'register':
        res = await Register(params);
        break;
      case 'update-password':
        res = await UpdateProfilePassword(params, userToken);
        break;
      case 'add-account-balance':
        res = await AddAccountBalance(params, userToken);
        break;
      case 'logout':
        setUserToken('', cookies());
        break;
      default:
        res = {};
    }
    return res;
  } catch (error: any) {
    return errorSystem(error.message, {});
  }
};
