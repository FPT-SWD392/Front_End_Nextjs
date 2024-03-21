import Profile2 from 'views/apps/user/account-profile/profile2';
import Grid from '@mui/material/Grid';
import { getUserToken } from '../../../../../package/cookies/token';
import { cookies } from 'next/headers';
import { GetCurrentUser } from '../../../../../package/api/User/GetAllInfoAboutUser';
import { GetTransactionHistory } from '../../../../../package/api/TransactionHistory/GetDepositeTransactionThisUser';
export default async function Page() {
  const userToken = await getUserToken(cookies());
  const user = await GetCurrentUser({}, userToken);
  const transactionHistory = await GetTransactionHistory({}, userToken);
  console.log(transactionHistory)
  return (
    <>
      <Profile2 user={user} transactionHistory={transactionHistory}/>
      <Grid container spacing={3} mt={2}>
        {/* {products.map((product: ProductsTypo, index) => (
          <Grid key={index} item xs={2.4}>
            <ProductCard
              href={`/user/product/product-details/${product.id}`}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              offerPrice={product.offerPrice}
              salePrice={product.salePrice}
              rating={product.rating}
              color={product.colors ? product.colors[0] : undefined}
            />
          </Grid>
        ))} */}
      </Grid>
    </>
  );
}
