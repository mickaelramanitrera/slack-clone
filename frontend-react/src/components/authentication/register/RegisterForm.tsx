import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useApolloClient } from '@apollo/client';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from '../../../redux/store';
import { requestRegisterAsync } from '../../../redux/slices/app';
import useSnackbar from '../../../hooks/useSnackbar';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const gqlClient = useApolloClient();
  const loading: boolean = useSelector(({ app }) => app.registerLoading);
  const { openAlert } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(2, 'Password is too short').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({ username, password, email }) => {
      const results = await dispatch(
        requestRegisterAsync({
          username,
          password,
          email,
          graphql: gqlClient,
        })
      );
      const { error, payload } = results as any;
      if (error) {
        const errorMessage: string =
          error?.message === 'Bad Request'
            ? 'Email user already exists'
            : error?.message || 'Unknown error on register';
        openAlert(errorMessage, 'error');
      } else {
        openAlert('User registered successfully !', 'success');
        navigate('/login', { replace: true });
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
