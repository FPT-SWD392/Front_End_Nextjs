import Image from 'next/image';
import { forwardRef } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { Chance } from 'chance';
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from 'next/navigation';
import { hasRequestAnimationFrame } from 'swr/dist/_internal';

const chance = new Chance();

const Transition = forwardRef((props: ZoomProps, ref) => <Zoom ref={ref} {...props} />);

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({
  open,
  setOpen,
  message,
  href = '/user/profile?target=history'
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  message?: string;
  href?: string;
}) => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const router = useRouter();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xl"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      {open && (
        <MainCard>
          <PerfectScrollbar style={{ overflowX: 'hidden', height: 'calc(100vh - 100px)' }}>
            <Grid container direction="column" spacing={gridSpacing} alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <Grid item xs={12}>
                <Typography variant={downMD ? 'h2' : 'h1'}>Order Success!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Image
                  alt=""
                  src={'/assets/images/e-commerce/completed.png'}
                  width={1920}
                  height={1080}
                  style={{
                    marginLeft: 40,
                    marginRight: 40,
                    width: 600,
                    height: 400,
                    objectFit: 'cover'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  container
                  spacing={3}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        router.push(href);
                      }}
                      variant="contained"
                      fullWidth
                    >
                      View your Order
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PerfectScrollbar>
        </MainCard>
      )}
    </Dialog>
  );
};

export default OrderComplete;
