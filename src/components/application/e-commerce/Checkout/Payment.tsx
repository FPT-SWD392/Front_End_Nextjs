'use client';

import { useEffect, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party

// project imports
import PaymentSelect from './PaymentSelect';
import PaymentOptions from './PaymentOptions';

import { gridSpacing } from 'store/constant';

// types
import { PaymentOptionsProps, Products } from 'types/e-commerce';

// assets
import { GetCurrentUserResponse } from '../../../../../package/api/User/GetAllInfoAboutUser';
import AnimateButton from 'ui-component/extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { apiClientFetch } from '../../../../../package/api/api-fetch';
import TextField from '@mui/material/TextField';
import OrderSummary from './OrderSummary';
import { createPaymentUrl } from '../../../../../package/vnpay';
import OrderComplete from './OrderComplete';
import { AddAccountBalanceRequest } from '../../../../../package/api/User/AddAccountBalance';

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  user: GetCurrentUserResponse;
}

const Payment = ({ user }: PaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [money, setMoney] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addAccountBalance = async (params: AddAccountBalanceRequest) => {
    try {
      const data = await apiClientFetch('add-account-balance', 'user', params);
      console.log(data);
      if (data.error) {
        throw new Error('');
      }
    } catch (error: any) {
      enqueueSnackbar('Giao dịch thất bại', {
        variant: 'error'
      });
    }
  };
  useEffect(() => {
    const vnp_TransactionStatus = new URLSearchParams(searchParams).get('vnp_TransactionStatus');
    const vnp_Amount = new URLSearchParams(searchParams).get('vnp_Amount');
    if (vnp_TransactionStatus) {
      if (vnp_TransactionStatus === '00') {
        if (vnp_Amount) {
          addAccountBalance({ amount: +vnp_Amount / 100, isSuccess: true, transactionType: 0 });
        }
        setOpenSuccess(true);
      } else {
        if (vnp_Amount) {
          addAccountBalance({ amount: +vnp_Amount / 100, isSuccess: false, transactionType: 0 });
        }
        enqueueSnackbar('Giao dịch thất bại', {
          variant: 'error'
        });
        window.location.href = '/user/profile?target=history';
      }
    }
  }, [searchParams]);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (money < 10000) {
        throw new Error('Số tiền nạp phải lớn hơn 10,000đ');
      }
      router.push(createPaymentUrl(money, `http://localhost:3000` + pathname));
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Payment Options</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              label="Balance"
              value={money}
              onChange={(e) => {
                setMoney(+e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                aria-label="delivery-options"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                name="delivery-options"
              >
                <Grid container spacing={gridSpacing} alignItems="center">
                  {PaymentOptions.map((item: PaymentOptionsProps, index) => (
                    <Grid item xs={12} key={index}>
                      <PaymentSelect item={item} />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Payment Options</Typography>
          </Grid>
          <Grid item xs={12}>
            <OrderSummary current={user.balance} adding={money} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row">
          <AnimateButton>
            <LoadingButton variant="outlined" size="large" loading={isLoading} onClick={handleClick}>
              Add Balance
            </LoadingButton>
          </AnimateButton>
        </Stack>
      </Grid>
      <OrderComplete open={openSuccess} setOpen={setOpenSuccess} />
    </Grid>
  );
};

export default Payment;
