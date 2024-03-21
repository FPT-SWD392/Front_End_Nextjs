'use client';

import { useEffect, useMemo, FC, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import MainContentStyled from './MainContentStyled';
import Loader from 'ui-component/Loader';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import useConfig from 'hooks/useConfig';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// types

interface Props {
  children: ReactNode;
}

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const { borderRadius, container, miniDrawer, menuOrientation } = useConfig();

  useEffect(() => {
    handlerDrawerOpen(!miniDrawer);
  }, [miniDrawer]);

  useEffect(() => {
    downMD && handlerDrawerOpen(false);
  }, [downMD]);

  const isHorizontal = false;

  // horizontal menu-list bar : drawer
  const menu = useMemo(() => <Sidebar />, [isHorizontal]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* header */}
      <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      {menu}

      {/* main content */}
      <MainContentStyled {...{ borderRadius, menuOrientation, open: drawerOpen!, theme }}>
        <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
          {/* breadcrumb */}
          <Breadcrumbs />
          {children}
        </Container>
      </MainContentStyled>
    </Box>
  );
};

export default MainLayout;
