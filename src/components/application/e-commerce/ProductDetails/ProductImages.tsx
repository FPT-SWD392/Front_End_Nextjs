'use client';

import { useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';

// third-party
import Slider, { Settings } from 'react-slick';
import Lightbox from 'react-18-image-lightbox';

// types
import { Products } from 'types/e-commerce';
import { GetArtInfoResponse } from '../../../../../package/api/Art/GetArtInfo';
import Image from 'next/image';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }: { product: GetArtInfoResponse }) => {

  const [modal, setModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ m: '0 auto' }}>
            <Image
              onClick={() => {
                setModal(!modal);
                setIsOpen(true);
              }}
              src={`https://projectswd392.azurewebsites.net/api/Art/Preview?artId=${product.artId}`}
              width={1920}
              height={1080}
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                cursor: 'zoom-in',
                objectFit: 'contain',
                width: '100%',
                height: "fit-content"
              }}
              alt="product images"
            />
          </MainCard>
        </Grid>
      </Grid>
      {isOpen && (
        <Lightbox
          onCloseRequest={() => setIsOpen(false)}
          mainSrc={`https://projectswd392.azurewebsites.net/api/Art/Preview?artId=${product.artId}`}
        />
      )}
    </>
  );
};

export default ProductImages;
