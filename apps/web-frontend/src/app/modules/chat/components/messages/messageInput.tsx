import React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send';
import {
  Plate,
  TEditableProps,
  usePlateEditorRef,
  usePlateEditorState
} from '@udecode/plate';

import { Message } from './types';

interface MessageInputProps {
  send: (message: Message) => void;
}

const getPlateValuePlainText = (
  value: any
): string => {
  return (
    value.map(
      ({
        children
      }: {
        children: { text: string }[];
      }) => children[0].text
    )[0] || ''
  );
};

export const MessageInput: React.FC<
  MessageInputProps
> = ({ send }) => {
  const editor = usePlateEditorRef();
  const editorValue = usePlateEditorState();

  const handleSave = React.useCallback(() => {
    if (
      !getPlateValuePlainText(
        editorValue.children
      )
    ) {
      return;
    }

    send({
      // Send the Message data
      id: Date.now().toString(),
      author: 'Mickaël',
      content: getPlateValuePlainText(
        editorValue.children
      ),
      isUser: true
    });
    editor.deleteBackward('block'); // Delete editor content after send
  }, [send, editor, editorValue]);

  const editableProps: TEditableProps =
    React.useMemo(
      () => ({
        placeholder: 'Type your message here...',
        onKeyDown: (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
          }
        }
      }),
      [handleSave]
    );

  return (
    <Card
      variant="outlined"
      sx={{
        py: 2,
        px: 4,
        mt: 4
      }}
    >
      <Plate<any>
        editableProps={editableProps}
        editor={editor}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Button
          variant="solid"
          size="sm"
          color="primary"
          startDecorator={<SendIcon />}
          onClick={handleSave}
        >
          Send
        </Button>
      </Box>
    </Card>
  );
};
