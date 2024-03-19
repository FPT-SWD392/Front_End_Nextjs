// project import
import Landing from 'views/landing';
import { GetArtList } from '../../../../package/api/Art/GetArtList';

// ==============================|| HOME PAGE ||============================== //

export default async function UserHomePage() {
  const data = await GetArtList({ page: 1 });

  return <Landing artList={data} />;
}
