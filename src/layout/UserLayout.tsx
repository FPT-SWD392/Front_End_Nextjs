'use client';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import AppBar from 'ui-component/extended/AppBar';

import FooterSection from 'components/landingpage/FooterSection';

// types
import { ThemeMode } from 'types/config';
import { ReactNode } from 'react';
import { GetCurrentUserResponse } from '../../package/api/User/GetAllInfoAboutUser';
const UserLayout = ({ children, user }: { children: ReactNode; user: GetCurrentUserResponse }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        id="home"
        sx={{
          overflowX: 'hidden',
          overflowY: 'clip',
          background:
            theme.palette.mode === ThemeMode.DARK
              ? 'background.default'
              : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`
        }}
      >
        <AppBar user={user}/>
        <Box my={15} px={3}>
          {children}
        </Box>
      </Box>
      <Box sx={{ py: 12.5, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'dark.900', pb: 0 }}>
        <FooterSection />
      </Box>
    </>
  );
};

export default UserLayout;
