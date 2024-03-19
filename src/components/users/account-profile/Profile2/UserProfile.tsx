// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
const Avatar1 = '/assets/images/user-rounded.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { GetCurrentUserResponse } from '../../../../../package/api/User/GetAllInfoAboutUser';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Button from '@mui/material/Button';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = ({ user }: { user: GetCurrentUserResponse }) => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt="User 1" src={Avatar1} sx={{ height: 80, width: 80 }} />
        </Grid>
        <Grid item sm zeroMinWidth>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                Image size Limit should be 125kb Max.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Name" defaultValue={user.fullName} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="NickName" defaultValue={user.nickName} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Email Address" defaultValue={user.email}/>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Phone Number" defaultValue={user.phoneNumber} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Address" defaultValue={user.location} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Site Information" defaultValue="www.company.com" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Stack direction="row">
        <AnimateButton>
          <Button variant="outlined" size="large">
            Change Information
          </Button>
        </AnimateButton>
      </Stack>
    </Grid>
  </Grid>
);

export default UserProfile;
