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
import { ArtWork } from '../../../../../package/api/Art/GetCreatedArtList';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { defaultTags } from '../../../../../package/api/Art/config';

// product color select

// product size
const defaultAvatar = '/assets/images/users/user-round.png';
// ==============================|| COLORS OPTION ||============================== //

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: ArtWork }) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/user/checkout?productId=' + product.artId);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">{product.artName}</Typography>
      </Grid>
      <Grid item xs={12}>
        {product.tags.map((e) => (
          <Chip
            size="small"
            label={defaultTags[e + 1]}
            color="primary"
            sx={{
              borderRadius: 1,
              marginRight: 2
            }}
          />
        ))}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            name="simple-controlled"
            value={product.averageRating}
            icon={<StarTwoToneIcon fontSize="inherit" />}
            emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
            precision={0.1}
            readOnly
          />
          <Typography variant="caption">({product.ratingCount}+)</Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt="User 1" src={product.creatorProfilePicture || defaultAvatar} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="subtitle1">{product.creatorNickName}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{product.description}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h2" color="primary">
          {product.price} VND
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={onClick} fullWidth color="secondary" variant="contained" size="large">
          Buy Now
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
