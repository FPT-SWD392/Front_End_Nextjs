'use client';

import { useEffect, useState, ReactElement } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import Cart from 'components/application/e-commerce/Checkout/Cart';
import Payment from 'components/application/e-commerce/Checkout/Payment';
import CartEmpty from 'components/application/e-commerce/Checkout/CartEmpty';

import { gridSpacing } from 'store/constant';
import { dispatch } from 'store';
import { getAddresses } from 'store/slices/product';
import { setBackStep, setNextStep, setShippingCharge, setStep } from 'store/slices/cart';

// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import { ArtWork } from '../../../../package/api/Art/GetArtInfo';
import { GetCurrentUserResponse } from '../../../../package/api/User/GetAllInfoAboutUser';

interface TabOptionProps {
  label: string;
  icon: ReactElement;
  caption: string;
}

// tabs option
const tabsOption: TabOptionProps[] = [
  {
    label: 'Checkout',
    icon: <ShoppingCartTwoToneIcon />,
    caption: 'Product Added'
  }
];

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

const Checkout = ({ art, user }: { art: ArtWork; user: GetCurrentUserResponse }) => {
  const { mode, borderRadius } = useConfig();

  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={(e, newValue) => handleChange(newValue)}
            aria-label="icon label tabs example"
            variant="scrollable"
            sx={{
              '& .MuiTabs-flexContainer': {
                borderBottom: 'none'
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              },
              '& .MuiButtonBase-root + .MuiButtonBase-root': {
                position: 'relative',
                overflow: 'visible',
                ml: 2,
                '&:after': {
                  content: '""',
                  bgcolor: '#ccc',
                  width: 1,
                  height: 'calc(100% - 16px)',
                  position: 'absolute',
                  top: 8,
                  left: -8
                }
              }
            }}
          >
            {tabsOption.map((tab, index) => (
              <Tab
                value={index}
                disabled={index > 0}
                key={index}
                icon={tab.icon}
                label={
                  <Grid container direction="column">
                    <Typography variant="subtitle1" color="inherit">
                      {tab.label}
                    </Typography>
                    <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                      {tab.caption}
                    </Typography>
                  </Grid>
                }
                sx={{
                  color: 1 >= value ? 'success.dark' : 'grey.900',
                  minHeight: 'auto',
                  minWidth: { xs: '100%', md: 250 },
                  padding: 2,
                  borderRadius: `${borderRadius}px`,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  '&:after': {
                    bgcolor: 'transparent !important'
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                  },
                  '& > svg': {
                    marginBottom: '0px !important',
                    mr: 1.25,
                    mt: 0.25,
                    height: 20,
                    width: 20
                  }
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <Cart product={art} user={user} />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Checkout;
