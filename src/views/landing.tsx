'use client';

// material-ui

import { Products as ProductsTypo } from 'types/e-commerce';
import Grid from '@mui/material/Grid';
import ProductCard from 'ui-component/cards/ProductCard';
import { ArtWork } from '../../package/api/Art/GetArtList';
// =============================|| LANDING MAIN ||============================= //

const Landing = ({ artList, isLogged }: { artList: ArtWork[]; isLogged: boolean }) => {
  return (
    <Grid container spacing={3}>
      {artList.map((product: ArtWork, index) => (
        <Grid key={index} item xs={2.4}>
          <ProductCard
            disabledBuying={isLogged}
            href={`/user/product/product-details/${product.artId}`}
            id={product.artId}
            createUserArt={product.creatorProfilePicture}
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
  );
};

export default Landing;
