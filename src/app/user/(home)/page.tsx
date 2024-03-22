// project import
import Landing from 'views/landing';
import { GetArtList } from '../../../../package/api/Art/GetArtList';
import { getUserToken } from '../../../../package/cookies/token';
import { cookies } from 'next/headers';

// ==============================|| HOME PAGE ||============================== //

export default async function UserHomePage() {
  const accessToken = await getUserToken(cookies());
  const data = await GetArtList({ page: 1 }, accessToken);
  return <Landing artList={data.artworkPreviews} isLogged={accessToken !== ''} />;
}
