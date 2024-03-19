import Profile2 from 'views/apps/user/account-profile/profile2';
import { Products as ProductsTypo } from 'types/e-commerce';
import Grid from '@mui/material/Grid';
import ProductCard from 'ui-component/cards/ProductCard';
import { getUserToken } from '../../../../../package/cookies/token';
import { cookies } from 'next/headers';
import { GetCurrentUser } from '../../../../../package/api/User/GetAllInfoAboutUser';
export default async function Page() {
  const userToken = await getUserToken(cookies())
  const user = await GetCurrentUser({}, userToken)
  return (
    <>
      <Profile2 user={user}/>
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
