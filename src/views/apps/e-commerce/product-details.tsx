'use client';

import { useState, SyntheticEvent } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import ProductImages from 'components/application/e-commerce/ProductDetails/ProductImages';
import ProductInfo from 'components/application/e-commerce/ProductDetails/ProductInfo';
import ProductReview from 'components/application/e-commerce/ProductDetails/ProductReview';

import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// types
import { TabsProps } from 'types';
import { products } from 'api/products';

function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-details-tab-${index}`,
    'aria-controls': `product-details-tabpanel-${index}`
  };
}

type Props = {
  id: string;
};

const ProductDetails = ({ id }: Props) => {
  // product description tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const product = products.find((e) => e.id === +id);

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing} maxWidth={'xl'}>
      <Grid item xs={8}>
        <MainCard>
          {product && product?.id === Number(id) && (
            <Grid container spacing={gridSpacing}>
              <Grid item xs={6}>
                <ProductImages product={product} />
              </Grid>
              <Grid item xs={6}>
                <ProductInfo product={product} />
              </Grid>
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="product description tabs example"
                  sx={{ '& a > svg': { mb: '0px !important', mr: 1.25 } }}
                  variant="scrollable"
                >
                  <Tab
                    label={
                      <Stack direction="row" alignItems="center">
                        Reviews <Chip label={String(product.offerPrice?.toFixed(0))} size="small" chipcolor="secondary" sx={{ ml: 1.5 }} />
                      </Stack>
                    }
                    {...a11yProps(0)}
                  />
                </Tabs>
       
                <TabPanel value={value} index={0}>
                  <ProductReview product={product} />
                </TabPanel>
              </Grid>
            </Grid>
          )}
        </MainCard>
      </Grid>
  
    </Grid>
  );
};

export default ProductDetails;
