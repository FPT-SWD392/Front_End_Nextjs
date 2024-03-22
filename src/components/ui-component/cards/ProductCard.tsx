'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// material-ui
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
const prodImage = '/assets/images/e-commerce';

// types
import { ProductCardProps } from 'types/product';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { GetArtUrl } from '../../../../package/api/Art/download';

const User1 = '/assets/images/users/user-round.svg';
// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, image, rating, href, disabledBuying, createUserArt, accessToken, isLogged = false }: ProductCardProps) => {
  const [productRating] = useState<number | undefined>(rating);
  const [url, setUrl] = useState('');
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const getUrlArt = async () => {
    const url = await GetArtUrl({ id }, accessToken as string);
    setUrl(url);
  };
  useEffect(() => {
    getUrlArt();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            height: 400,
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            },
            position: 'relative'
          }}
        >
          <Image
            alt=""
            style={{ position: 'absolute', width: '100%', height: 400, objectFit: 'cover', objectPosition: 'center' }}
            width={1920}
            height={1080}
            src={image}
          />
          <CardContent
            sx={{
              p: 2,
              opacity: 0,
              position: 'absolute',
              bgcolor: 'rgb(0, 0, 0, 0.7)',
              height: 400,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              '&:hover': {
                opacity: 1,
                cursor: 'pointer'
              }
            }}
          >
            <Button color="error" variant="contained" sx={{ ml: 20, borderRadius: 20 }}>
              Report
            </Button>
            {disabledBuying ? (
              <Box flex={1} component={Link} href={url as string} target="_blank"></Box>
            ) : (
              <Box flex={1} component={Link} href={href as string}></Box>
            )}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box display={'flex'} alignItems={'center'} bgcolor={'white'} p={0.5} borderRadius={10}>
                <Avatar
                  src={createUserArt}
                  sx={{
                    ...theme.typography.mediumAvatar,
                    cursor: 'pointer',
                    marginRight: 1
                  }}
                  aria-haspopup="true"
                  color="inherit"
                  alt="user images"
                />
                <Rating precision={0.5} name="size-small" value={productRating} size="small" readOnly />
              </Box>
              {!disabledBuying && isLogged && (
                <Link href={`/user/checkout?productId=${id}`}>
                  <IconButton sx={{ minWidth: 0 }} style={{ backgroundColor: 'white' }}>
                    <ShoppingCartTwoToneIcon fontSize="small" />
                  </IconButton>
                </Link>
              )}
            </Stack>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ProductCard;
