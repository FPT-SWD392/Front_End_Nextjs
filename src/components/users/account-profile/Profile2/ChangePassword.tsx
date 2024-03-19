'use client';
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { apiClientFetch } from '../../../../../package/api/api-fetch';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton';

// ==============================|| PROFILE 2 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await apiClientFetch('update-password', 'user', {
        oldPassword,
        newPassword
      });
      enqueueSnackbar('Cập nhật thông tin thành công', {
        variant: 'success'
      });
      router.refresh();
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
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          fullWidth
          label="Current Password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} />
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          fullWidth
          label="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          fullWidth
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row">
          <AnimateButton>
            <LoadingButton
              variant="outlined"
              size="large"
              loading={isLoading}
              onClick={handleClick}
              disabled={oldPassword === newPassword || oldPassword === confirmPassword || newPassword === ""}
            >
              Change Password
            </LoadingButton>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
