import Profile2 from 'views/apps/user/account-profile/profile2';
import Grid from '@mui/material/Grid';
import { getUserToken } from '../../../../../package/cookies/token';
import { cookies } from 'next/headers';
import { GetCurrentUser } from '../../../../../package/api/User/GetAllInfoAboutUser';
import { GetTransactionHistory } from '../../../../../package/api/TransactionHistory/GetDepositeTransactionThisUser';
import { GetPurchasedArtList } from '../../../../../package/api/Art/GetPurchasedArtList';
import { GetCreatedArtList } from '../../../../../package/api/Art/GetCreatedArtList';
import { ArtWork } from '../../../../../package/api/Art/GetArtList';
import ProductCard from 'ui-component/cards/ProductCard';
import MuiTypography from '@mui/material/Typography';
export default async function Page() {
  const userToken = await getUserToken(cookies());
  const user = await GetCurrentUser({}, userToken);
  const transactionHistory = await GetTransactionHistory({}, userToken);
  const purchasedArtList = await GetPurchasedArtList({ page: 1 }, userToken);
  const createdArtList = await GetCreatedArtList({ page: 1 }, userToken);
  return (
    <>
      <Profile2 user={user} transactionHistory={transactionHistory} accessToken={userToken} />
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <MuiTypography variant="h3" gutterBottom>
            Art Purchased
          </MuiTypography>
        </Grid>
        {purchasedArtList.artworkPreviews.map((product: ArtWork, index) => (
          <Grid key={index} item xs={2.4}>
            <ProductCard
              accessToken={userToken}
              createUserArt={product.creatorProfilePicture}
              disabledBuying={true}
              href={`/user/product/product-details/${product.artId}`}
              id={product.artId}
              image={`https://projectswd392.azurewebsites.net/api/Art/Preview?artId=${product.artId}`}
              name={product.artName}
              description={product.artName}
              offerPrice={product.price}
              salePrice={product.price}
              rating={product.averageRating}
              color={undefined}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <MuiTypography variant="h3" gutterBottom>
            Art Created
          </MuiTypography>
        </Grid>
        {createdArtList.artworkPreviews.map((product: ArtWork, index) => (
          <Grid key={index} item xs={2.4}>
            <ProductCard
              accessToken={userToken}
              createUserArt={product.creatorProfilePicture}
              disabledBuying={true}
              href={`/user/product/product-details/${product.artId}`}
              id={product.artId}
              image={`https://projectswd392.azurewebsites.net/api/Art/Preview?artId=${product.artId}`}
              name={product.artName}
              description={product.artName}
              offerPrice={product.price}
              salePrice={product.price}
              rating={product.averageRating}
              color={undefined}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
