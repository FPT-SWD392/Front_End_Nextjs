import Grid from '@mui/material/Grid';
import Checkout from 'views/apps/e-commerce/checkout';
import { GetArtInfo } from '../../../../../package/api/Art/GetArtInfo';
import { getUserToken } from '../../../../../package/cookies/token';
import { cookies } from 'next/headers';
import { GetCurrentUser } from '../../../../../package/api/User/GetAllInfoAboutUser';
type Props = {
  searchParams: {
    productId: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { productId } = searchParams;
  const data = await GetArtInfo({ id: +productId });
  const accessToken = await getUserToken(cookies());
  const user = await GetCurrentUser({}, accessToken);
  return (
    <Grid container alignItems="center" justifyContent="center" maxWidth={'xl'}>
      <Grid item xs={8}>
        <Checkout art={data} user={user} />
      </Grid>
    </Grid>
  );
}
