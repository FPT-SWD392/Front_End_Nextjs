// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

// project import
import Chip from 'ui-component/extended/Chip';
import { frameworks } from './FrameworkSection';

// assets
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

// types
import { ThemeMode } from 'types/config';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.text.secondary : theme.palette.text.hint,
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&:active': {
    color: theme.palette.primary.main
  }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'text.hint';

  return (
    <>
      <Container sx={{ mb: 15 }} maxWidth="xl"></Container>
      <Box sx={{ bgcolor: 'dark.dark', py: { xs: 3, sm: 1.5 } }}>
        <Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={{ xs: 1.5, sm: 1, md: 3 }}
          >
            <Typography color="text.secondary">
          
            </Typography>
            <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
              <IconButton size="small" aria-label="Berry Blog" component={Link} href="https://links.codedthemes.com/HTIBc" target="_blank">
                <PublicIcon sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} />
              </IconButton>
              <IconButton
                size="small"
                aria-label="codedTheme Twitter"
                component={Link}
                href="https://twitter.com/codedthemes"
                target="_blank"
              >
                <TwitterIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
              </IconButton>
              <IconButton
                size="small"
                aria-label="codedTheme Dribble"
                component={Link}
                href="https://dribbble.com/codedthemes"
                target="_blank"
              >
                <SportsBasketballIcon sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }} />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default FooterSection;
