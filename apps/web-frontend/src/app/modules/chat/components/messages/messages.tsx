import React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import type { Message } from './types';

interface MessageItemProps {
  author: string;
  content: string;
  isUser?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  author,
  content,
  isUser
}) => (
  <Box sx={{ overflow: 'auto' }}>
    <Card
      variant="outlined"
      sx={{
        maxWidth: 320,
        display: 'inline-block',
        pr: 4,
        my: 0.5,
        float: !isUser ? 'right' : 'none'
      }}
    >
      <Typography
        level="body1"
        startDecorator={
          <Avatar size="sm">{author[0]}</Avatar>
        }
        sx={{ mb: 1 }}
      >
        {author}
      </Typography>
      <Typography level="body2">
        {content}
      </Typography>
    </Card>
  </Box>
);

interface MessagesProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesProps> = ({
  messages
}) => {
  const bottomRef =
    React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messages.length) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <>
      {messages.map((message) => (
        <MessageItem
          author={message.author}
          content={message.content}
          isUser={message.isUser}
          key={message.id}
        />
      ))}
      <div ref={bottomRef} />
    </>
  );
};

export default MessagesList;
