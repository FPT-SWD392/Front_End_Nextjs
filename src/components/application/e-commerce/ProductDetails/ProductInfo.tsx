import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

// project imports

import { openSnackbar } from 'store/slices/snackbar';
import { dispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';

// types
import { Products } from 'types/e-commerce';

// assets
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';

// product color select

// product size

const validationSchema = yup.object({});

// ==============================|| COLORS OPTION ||============================== //

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: Products }) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/user/checkout?productId=' + product.id);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h3">{product.name}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{product.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            name="simple-controlled"
            value={product.rating}
            icon={<StarTwoToneIcon fontSize="inherit" />}
            emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
            precision={0.1}
            readOnly
          />
          <Typography variant="caption">({product.salePrice}+)</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h2" color="primary">
            ${product.offerPrice}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={onClick} fullWidth color="secondary" variant="contained" size="large">
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
