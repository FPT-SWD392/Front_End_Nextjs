'use client';

import { forwardRef, useEffect, useRef, useState, SyntheticEvent, FormEvent } from 'react';

// material-ui
import { useTheme, Theme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slide, { SlideProps } from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { UploadImageButton } from 'components/button/upload-button';
import { CreateArtWork } from '../../../../../package/api/Art/CreateArtWork';
import { useRouter } from 'next/navigation';
import { defaultTags } from '../../../../../package/api/Art/config';
import { enqueueSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import LoadingButton from '@mui/lab/LoadingButton';

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  cursor: 'pointer',
  width: 55,
  height: 55,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.default,
  '& > svg': {
    verticalAlign: 'sub',
    marginRight: 6
  }
}));

// product category options
const categories = [
  {
    value: '1',
    label: 'Iphone 12 Pro Max'
  },
  {
    value: '2',
    label: 'Iphone 11 Pro Max'
  },
  {
    value: '3',
    label: 'Nokia'
  },
  {
    value: '4',
    label: 'Samsung'
  }
];

// animation
const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);
Transition.displayName = 'Transition';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  chip: {
    margin: 2
  }
};

// tags list & style
const tagNames = ['1', '2', '3'];

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

// ==============================|| PRODUCT ADD DIALOG ||============================== //

interface ProductAddProps {
  open: boolean;
  accessToken: string;
  handleCloseDialog: () => void;
}

const ProductAdd = ({ open, handleCloseDialog, accessToken }: ProductAddProps) => {
  const theme = useTheme();

  // set image upload progress
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
      } else {
        const diff = Math.random() * 10;
        setProgress(progress + diff);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // handle tag select
  const [tag, setTag] = useState<string[]>([]);
  const handleTagSelectChange = (event: SelectChangeEvent<string[]>) => {
    setTag(event.target.value as string[]);
  };
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await CreateArtWork({ description, name, price, tags: tag }, e, accessToken);
      enqueueSnackbar('Tạo thành công', {
        variant: 'success'
      });
    } catch (error) {
    } finally {
      router.refresh();
      handleCloseDialog();
      setIsLoading(false);
    }
  };

  const [imageURL, setImageURL] = useState<string>('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={gridSpacing} margin="auto">
        <Grid item xs={5}>
          <Stack spacing={gridSpacing}>
            <TextField
              id="outlined-basic1"
              fullWidth
              value={name}
              label="Enter Product Name*"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic2"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="Enter Description"
            />
            <TextField
              label="Price*"
              value={price}
              type="number"
              id="filled-start-adornment1"
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Tags</Typography>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Select
                    id="demo-multiple-chip"
                    multiple
                    fullWidth
                    value={tag}
                    onChange={handleTagSelectChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div>
                        {typeof selected !== 'string' &&
                          selected.map((value) => <Chip key={value} label={defaultTags[+value - 1]} sx={{ ml: 0.5 }} />)}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {defaultTags.map((name, index) => (
                      <MenuItem key={name} value={index + 1 + ''} sx={getStyles(name, tag.toString(), theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={7}>
          <Grid container spacing={1}>
            {imageURL === '' ? (
              <Grid item xs={12}>
                <TextField
                  type="file"
                  onChange={handleFileChange}
                  id="file-upload"
                  fullWidth
                  label="Enter SKU"
                  name="ImageFile"
                  sx={{ display: 'none' }}
                />
                <InputLabel
                  htmlFor="file-upload"
                  sx={{
                    bgcolor: 'background.default',
                    py: 3.75,
                    px: 0,
                    textAlign: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    mb: 3,
                    '& > svg': {
                      verticalAlign: 'sub',
                      mr: 0.5
                    }
                  }}
                >
                  <CloudUploadIcon /> Drop file here to upload
                </InputLabel>
              </Grid>
            ) : (
              <Grid item xs={12}>
              <CardMedia
                image={imageURL}
                alt=""
                component={'img'}
                sx={{
                  width: '100%',
                  height: 320,
                  objectFit: 'cover'
                }}
              />
            </Grid>
            )}
 
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ flexDirection: 'row', display: 'flex' }}>
          <AnimateButton>
            <LoadingButton variant="outlined" type="submit" loading={isLoading}>
              Create Image
            </LoadingButton>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductAdd;
