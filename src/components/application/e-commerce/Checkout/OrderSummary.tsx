// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// types
import { Products } from 'types/e-commerce';

// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSummary = ({ product }: { product: Products }) => (
  <SubCard>
    <TableContainer>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Order Summary</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Sub Total</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">{currency(product.offerPrice as number).format()}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none' }}>
            <Typography variant="subtitle1">{currency(product.offerPrice as number).format()}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </SubCard>
);

export default OrderSummary;
