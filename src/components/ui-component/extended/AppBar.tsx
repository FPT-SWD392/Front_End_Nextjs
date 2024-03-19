'use client';

import { cloneElement, ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';

// project imports
import Logo from '../Logo';

// assets

// types
import { ThemeMode } from 'types/config';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import Button from '@mui/material/Button';
import ProfileSection from 'layout/MainLayout/Header/ProfileSection';
import Link from 'next/link';
import { GetCurrentUserResponse } from '../../../../package/api/User/GetAllInfoAboutUser';

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    style: {
      backgroundColor: theme.palette.mode === ThemeMode.DARK && trigger ? theme.palette.dark[800] : theme.palette.background.default,
      color: theme.palette.text.dark
    }
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ user, ...others }: { user: GetCurrentUserResponse }) => {
  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
            <Typography mr={2}>
              <Logo />
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={0}>
              <Button color="inherit" component={Link} href="/user" size="large">
                Home
              </Button>
              {user ? (
                <Button color="inherit" component={Link} href="login" target="_blank" size="large">
                  Create
                </Button>
              ) : (
                <></>
              )}
            </Stack>
            <Box flexGrow={1}>
              <SearchSection borderRadius={10} />
            </Box>
            <Stack direction="row" spacing={1}>
              {user ? (
                <>
                  <IconButton color="inherit" component={Link} href="#" size="large">
                    <NotificationsIcon fontSize="medium" color="primary" />
                  </IconButton>
                  <IconButton color="inherit" component={Link} href="login" target="_blank" size="large">
                    <ChatIcon fontSize="medium" color="primary" />
                  </IconButton>
                  <ProfileSection profileNavigation="/user/profile" user={user}/>
                </>
              ) : (
                <Link href={'/user/login'} style={{ alignItems: 'center', display: 'flex' }}>
                  <Button variant="contained">Login</Button>
                </Link>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
