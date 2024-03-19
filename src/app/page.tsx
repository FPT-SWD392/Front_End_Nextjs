import { redirect } from 'next/navigation';
import { getAdminToken, getUserToken } from '../../package/cookies/token';
import { cookies } from 'next/headers';

export default async function Page() {
  const userToken = await getUserToken(cookies())
  const adminToken = await getAdminToken(cookies())
  if (userToken) {
    redirect('/user');
  } 
  if (adminToken) {
    redirect('/admin');
  }
  redirect('/user/login');
}
