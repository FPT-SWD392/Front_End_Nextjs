'use client';

import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import OrderSummary from './OrderSummary';
import AddressCard from './AddressCard';
import PaymentSelect from './PaymentSelect';
import ColorOptions from '../ColorOptions';
import PaymentOptions from './PaymentOptions';
import PaymentCard from './PaymentCard';
import AddPaymentCard from './AddPaymentCard';
import OrderComplete from './OrderComplete';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// types
import { CartCheckoutStateProps } from 'types/cart';
import { PaymentOptionsProps, Products } from 'types/e-commerce';

// assets
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { setPaymentCard, setPaymentMethod } from 'store/slices/cart';

const prodImage = '/assets/images/e-commerce';

// product color select
function getColor(color: string) {
  return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  product: Products;
  onBack: () => void;
}

const Payment = ({ product, onBack }: PaymentProps) => {
  // const [type, setType] = useState(checkout.payment.type);
  // const [payment, setPayment] = useState(checkout.payment.method);
  // const [rows, setRows] = useState(checkout.products);
  // const [cards, setCards] = useState(checkout.payment.card);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [complete, setComplete] = useState(false);

  // useEffect(() => {
  //   setRows(checkout.products);
  // }, [checkout.products]);

  // const cardHandler = (card: string) => {
  //   if (payment === 'card') {
  //     setCards(card);
  //     dispatch(setPaymentCard(card));
  //   }
  // };

  // const handlePaymentMethod = (value: string) => {
  //   setPayment(value);
  //   dispatch(setPaymentMethod(value));
  // };

  const completeHandler = () => {
    setComplete(true);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Payment Options</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Items</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <RadioGroup
                aria-label="delivery-options"
                // value={payment}
                // onChange={(e) => handlePaymentMethod(e.target.value)}
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
          <Grid item xs={6}>
            <Stack spacing={gridSpacing}>
              <TableContainer>
                <Table sx={{ minWidth: 280, minHeight: 96 }} aria-label="simple table">
                  <TableBody>
                    <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Avatar
                          size="md"
                          variant="rounded"
                          alt="product images"
                          src={product.image ? `${prodImage}/${product.image}` : ''}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {product.offerPrice && <Typography variant="subtitle1">{currency(product.offerPrice).format()}</Typography>}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <OrderSummary product={product} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
              <Grid item>
                <Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={onBack}>
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={completeHandler}>
                  Complete Order
                </Button>
                <OrderComplete open={complete} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;
