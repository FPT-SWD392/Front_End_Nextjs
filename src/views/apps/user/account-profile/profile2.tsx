'use client';

import React, { useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import UserProfile from 'components/users/account-profile/Profile2/UserProfile';
import ChangePassword from 'components/users/account-profile/Profile2/ChangePassword';
import Payment from 'components/application/e-commerce/Checkout/Payment';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import { CreateArtWork } from '../../../../../package/api/Art/CreateArtWork';
import { GetCurrentUserResponse } from '../../../../../package/api/User/GetAllInfoAboutUser';
import { useSearchParams } from 'next/navigation';
import UserAddingBalanceList from 'views/apps/customer/user-adding-balance-list';
import { TransactionHistory } from '../../../../../package/api/TransactionHistory/GetDepositeTransactionThisUser';

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
    label: 'User Profile',
    icon: <PersonOutlineTwoToneIcon />,
    caption: 'Profile Settings'
  },
  {
    label: 'Change Password',
    icon: <VpnKeyTwoToneIcon />,
    caption: 'Update Profile Security'
  },
  {
    label: 'Balance',
    icon: <MonetizationOnTwoToneIcon />,
    caption: 'Add Balance'
  },
  {
    label: 'History',
    icon: <AccountBalanceWalletTwoToneIcon />,
    caption: 'Transaction History'
  }
];

// ==============================|| PROFILE 2 ||============================== //

const Profile2 = ({ user, transactionHistory }: { user: GetCurrentUserResponse; transactionHistory: TransactionHistory[] }) => {
  const { mode, borderRadius } = useConfig();
  const [value, setValue] = React.useState<number>(0);
  const searchParams = useSearchParams();
  useEffect(() => {
    const vnp_TransactionStatus = new URLSearchParams(searchParams).get('vnp_TransactionStatus');
    if (vnp_TransactionStatus) {
      setValue(2);
    }
    const target = new URLSearchParams(searchParams).get('target');
    if (target) {
      setValue(3);
    }
  }, [searchParams]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Account Settings" content={false}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={4}>
              <CardContent>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  orientation="vertical"
                  variant="scrollable"
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none'
                    },
                    '& button': {
                      color: mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                      minHeight: 'auto',
                      minWidth: '100%',
                      py: 1.5,
                      px: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      borderRadius: `${borderRadius}px`
                    },
                    '& button.Mui-selected': {
                      color: 'primary.main',
                      bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                    },
                    '& button > svg': {
                      marginBottom: '0px !important',
                      marginRight: 1.25,
                      marginTop: 1.25,
                      height: 20,
                      width: 20
                    },
                    '& button > div > span': {
                      display: 'block'
                    },
                    '& > div > span': {
                      display: 'none'
                    }
                  }}
                >
                  {tabsOption.map((tab, index) => (
                    <Tab
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
                      {...a11yProps(index)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent
                sx={{
                  borderLeft: '1px solid',
                  borderColor: mode === ThemeMode.DARK ? 'background.default' : 'grey.200',
                  height: '100%'
                }}
              >
                <TabPanel value={value} index={0}>
                  <UserProfile user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ChangePassword />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Payment user={user} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <UserAddingBalanceList transactionHistory={transactionHistory}/>
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Profile2;
