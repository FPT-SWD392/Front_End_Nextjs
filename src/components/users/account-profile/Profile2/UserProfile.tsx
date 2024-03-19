// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
const Avatar1 = '/assets/images/users/user-round.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { GetCurrentUserResponse } from '../../../../../package/api/User/GetAllInfoAboutUser';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { enqueueSnackbar } from 'notistack';
import { apiClientFetch } from '../../../../../package/api/api-fetch';
import { useRouter } from 'next/navigation';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = ({ user }: { user: GetCurrentUserResponse }) => {
  const [FullName, setFullName] = useState(user.fullName);
  const [Location, setLocation] = useState(user.location);
  const [PhoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [NickName, setNickName] = useState(user.nickName);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await apiClientFetch('manage-profile', 'user', {
        FullName,
        Location,
        PhoneNumber,
        NickName
      });
      enqueueSnackbar('Cập nhật thông tin thành công', {
        variant: 'success'
      });
      router.refresh()
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
        <TextField
          fullWidth
          label="Name"
          value={FullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="NickName"
          value={NickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={PhoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Address"
          value={Location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Email Address" defaultValue={user.email} disabled />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row">
          <AnimateButton>
            <LoadingButton variant="outlined" size="large" onClick={handleClick} loading={isLoading}>
              Change Information
            </LoadingButton>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
