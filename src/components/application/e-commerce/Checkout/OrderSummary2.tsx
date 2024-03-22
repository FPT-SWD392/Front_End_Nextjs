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
import { formatNumber } from '../../../../../package/util';

// types

// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSummary2 = ({ current, order }: { current: number; order: number }) => (
  <SubCard>
    <TableContainer>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography my={1}>Total Order</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{formatNumber(order)}đ</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography my={1}>Current Balance</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{formatNumber(current)}đ</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Remain</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1" color={current - order > 0 ? 'green' : 'red'}>
                {formatNumber(current - order)}đ
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </SubCard>
);

export default OrderSummary2;
