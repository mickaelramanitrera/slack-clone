/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { Box, Grid, Container, Typography, Stack, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useApolloClient } from '@apollo/client';
import * as Yup from 'yup';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from '../redux/store';
import Page from '../components/Page';
import { Message } from '../components/_dashboard/app/channel';
import useUserConnected from '../hooks/useUserConnected';
import { createMessageThunk, fetchMessagesThunk } from '../redux/slices/messages';

export default () => {
  const { id } = useParams();
  const gqlClient = useApolloClient();
  const dispatch = useDispatch();
  const { user } = useUserConnected();
  const { channel, messages, loading } = useSelector(({ channels, messages }) => ({
    channel: channels.channels.filter((channel) => channel.id === id)[0] || null,
    messages: messages.messages,
    loading: messages.loading,
  }));
  useEffect(() => {
    dispatch(fetchMessagesThunk({ graphql: gqlClient, channelId: id || '0' }));
  }, [id, channel]);

  const MessageSchema = Yup.object().shape({
    content: Yup.string().required('Message is required').min(1, 'Too short (1 char min)'),
  });
  const formik = useFormik({
    initialValues: {
      content: '',
      from: user?.id || '1',
      channel: id || '1',
    },
    enableReinitialize: true,
    validationSchema: MessageSchema,
    onSubmit: async (values) => {
      console.log(values);
      const results = await dispatch(
        createMessageThunk({
          ...values,
          graphql: gqlClient,
        })
      );
      setFieldValue('content', '');
      setFieldTouched('content', false);

      console.log('Results', results);
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, setFieldTouched } = formik;

  return (
    <Page title="Channel | Slack Clone" style={{ marginBottom: 0 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Container maxWidth="xl" style={{ height: '80vh' }}>
            <Stack style={{ height: '100%' }}>
              <Box sx={{ pb: 2 }}>
                <Typography variant="h4">{channel?.name || 'Default Channel'}</Typography>
              </Box>
              <Box sx={{ py: 2 }} style={{ flexGrow: 2 }}>
                <Stack spacing={4} style={{ overflowY: 'auto', maxHeight: '66vh' }}>
                  {loading && <LinearProgress />}
                  {messages.map((message, index) => (
                    <Message
                      from={message?.from || null}
                      key={`message-${index}`}
                      content={message?.content || ''}
                      position={message?.from?.id === user?.id ? 'right' : 'left'}
                    />
                  ))}
                </Stack>
              </Box>
              <Box sx={{ pt: 1 }} style={{ width: '100%', height: '164px' }}>
                <Stack spacing={1}>
                  <TextField
                    multiline
                    minRows={3}
                    maxRows={3}
                    fullWidth
                    autoComplete="content"
                    type="text"
                    label="Your message"
                    {...getFieldProps('content')}
                    error={Boolean(touched.content && errors.content)}
                    helperText={touched.content && errors.content}
                  />
                  <LoadingButton loading={isSubmitting} variant="contained" size="large" fullWidth type="submit">
                    Send
                  </LoadingButton>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Form>
      </FormikProvider>
    </Page>
  );
};
