/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import * as Yup from 'yup';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControlLabel,
  FormControl,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useUserConnected from '../../../hooks/useUserConnected';
import { useSelector, useDispatch } from '../../../redux/store';
import { createChannelAsync } from '../../../redux/slices/channels';
import useModal from '../../../hooks/useModal';

export default () => {
  const ChannelSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5, 'Too short (5 chars min)'),
    description: Yup.string().required('Description is required'),
    members: Yup.array().required('Must be atleast one member'),
  });
  const { closeModal } = useModal();
  const gqlClient = useApolloClient();
  const dispatch = useDispatch();
  const { user } = useUserConnected();
  const users = useSelector(({ app }) => (app.users || []).filter((u: any) => u?.id !== user?.id));

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      members: [],
    },
    validationSchema: ChannelSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        members: [...values.members, user?.id || '0'],
        owner: user?.id || '0',
        type: 'public',
        graphql: gqlClient,
      };

      const response: any = await dispatch(createChannelAsync(payload));
      // console.log(response);
      closeModal();
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <DialogTitle>Create a new channel</DialogTitle>
      <DialogContent sx={{ width: '350px' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ pt: 1, pb: 2 }}>
              <TextField
                fullWidth
                autoComplete="name"
                type="text"
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                multiline
                minRows={3}
                fullWidth
                autoComplete="description"
                type="text"
                label="Description"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Members</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...getFieldProps('members')}
                  label="Members"
                  multiple
                >
                  {users.map((u: any) => (
                    <MenuItem value={u?.id || '0'}>{u?.email || 'noname'}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <DialogActions>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Create
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </DialogContent>
    </>
  );
};
