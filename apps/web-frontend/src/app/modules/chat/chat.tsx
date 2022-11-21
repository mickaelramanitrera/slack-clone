import React from 'react';
import { PlateProvider } from '@udecode/plate';
import Divider from '@mui/joy/Divider';
import Layout from '../layout';
import Channels from './components/channels';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LaptopIcon from '@mui/icons-material/Laptop';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import BugReportIcon from '@mui/icons-material/BugReport';
import SubwayIcon from '@mui/icons-material/Subway';
import Header from './components/header';
import BackgroundPattern from '../../../assets/background_pattern.jpg';
import type { Channel } from './components/channels/types';
import Messages, {
  MessageInput
} from './components/messages';
import type { Message } from './components/messages/types';

interface ChatProps {
  title?: string;
}

const loadChannels: () => Channel[] = () => [
  {
    name: 'Hot take',
    icon: <WhatshotIcon />
  },
  {
    name: 'General development',
    icon: <LaptopIcon />
  },
  {
    name: 'Office',
    icon: <LocalPoliceIcon />
  },
  {
    name: 'Bugs very long for testing purposes for wraping text',
    icon: <BugReportIcon />
  },
  {
    name: 'Pipelines',
    icon: <SubwayIcon />
  }
];

const loadMessages: () => Message[] = () => [
  {
    author: 'Mickaël',
    content: 'Hello world !',
    id: '1',
    isUser: true
  },
  {
    author: 'Hordea',
    content:
      'How are you guys ? tesla is making some big gains!',
    id: '2'
  },
  {
    author: 'Mickaël',
    content: 'Catch me if you can',
    id: '3',
    isUser: true
  },
  {
    author: 'Porc Epic',
    content: 'Catch me if you can',
    id: '4'
  },
  {
    author: 'Hordea',
    content:
      'How are you guys ? tesla is making some big gains!',
    id: '5'
  },
  {
    author: 'Mickaël',
    content: 'Catch me if you can',
    id: '6',
    isUser: true
  },
  {
    author: 'Porc Epic',
    content: 'Catch me if you can',
    id: '7'
  },
  {
    author: 'Porc Epic',
    content: 'Catch me if you can',
    id: '8'
  },
  {
    author: 'Hordea',
    content:
      'How are you guys ? tesla is making some big gains!',
    id: '9'
  },
  {
    author: 'Mickaël',
    content: 'Catch me if you can',
    id: '10',
    isUser: true
  },
  {
    author: 'Porc Epic',
    content: 'Catch me if you can',
    id: '11'
  }
];

export const Chat: React.FC<ChatProps> = () => {
  const [channels, setChannels] = React.useState<
    Channel[]
  >([]);
  const [messages, setMessages] = React.useState<
    Message[]
  >([]);

  React.useEffect(() => {
    setChannels(loadChannels());
    setMessages(loadMessages());
  }, []);

  const sendMessage = React.useCallback(
    (message: Message) => {
      setMessages([...messages, message]);
    },
    [setMessages, messages]
  );

  return (
    <Layout.Root>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.SideNav>
        <Channels
          title="Channels"
          channels={channels}
        />
        <Divider />
        <Channels
          title="Direct messages"
          channels={channels}
        />
      </Layout.SideNav>
      <Layout.Main
        sx={{
          backgroundImage: `url(${BackgroundPattern})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-y repeat-x',
          px: 2
        }}
      >
        <Layout.UpDown>
          <Layout.Up>
            <Layout.CenteredContainer>
              <Messages messages={messages} />
            </Layout.CenteredContainer>
          </Layout.Up>
          <Layout.Down>
            <Layout.CenteredContainer>
              <PlateProvider>
                <MessageInput
                  send={sendMessage}
                />
              </PlateProvider>
            </Layout.CenteredContainer>
          </Layout.Down>
        </Layout.UpDown>
      </Layout.Main>
    </Layout.Root>
  );
};
