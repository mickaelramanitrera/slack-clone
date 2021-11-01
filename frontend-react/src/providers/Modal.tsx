import React from 'react';
import Dialog from '@mui/material/Dialog';

export interface ModalContextValue {
  openModal: (content: React.ReactNode | null) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextValue>({
  openModal: (content: React.ReactNode | null) => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [modalContent, setContent] = React.useState<React.ReactNode | null>(null);
  const onClose = () => {
    setOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal: (content: React.ReactNode | null) => {
          setContent(content);
          setOpen(true);
        },
        closeModal: onClose,
      }}
    >
      <Dialog open={isOpen} onClose={onClose}>
        {modalContent}
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
