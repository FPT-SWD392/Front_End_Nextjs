import UserLayout from 'layout/UserLayout';
import { ReactNode } from 'react';
import { getUserToken } from '../../../../package/cookies/token';
import { cookies } from 'next/headers';
import { GetCurrentUser } from '../../../../package/api/User/GetAllInfoAboutUser';

export default async function Layout({ children }: { children: ReactNode }) {
  const userToken = await getUserToken(cookies());
  const user: any = await GetCurrentUser({}, userToken);
  return <UserLayout user={user.error ? null : user}>{children}</UserLayout>;
}
