/* eslint-disable prefer-arrow-callback */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface SnackbarContextValue {
  openAlert: (message: string, type: 'success' | 'error') => void;
  closeAlert: () => void;
}

export const SnackbarContext = React.createContext<SnackbarContextValue>({
  openAlert: () => {},
  closeAlert: () => {},
});

export const SnackbarProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>('');
  const [type, setType] = React.useState<'success' | 'error'>('success');

  const onClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{
        openAlert: (message: string, type: 'error' | 'success') => {
          setText(message);
          setType(type);
          setOpen(true);
        },
        closeAlert: () => {
          setText('');
          setOpen(false);
        },
      }}
    >
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={type}>{text}</Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
