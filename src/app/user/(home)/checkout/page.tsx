import Grid from '@mui/material/Grid';
import Checkout from 'views/apps/e-commerce/checkout';

export default function Page() {
  return (
    <Grid container alignItems="center" justifyContent="center" maxWidth={'xl'}>
      <Grid item xs={8}>
        <Checkout />
      </Grid>
    </Grid>
  );
}
