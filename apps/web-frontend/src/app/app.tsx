import { CssVarsProvider } from '@mui/joy/styles';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import CssBaseline from '@mui/joy/CssBaseline';
import Login from './modules/login';
import Chat from './modules/chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login title="Welcome to Slack clone" />
    )
  },
  {
    path: '/chat',
    element: <Chat />
  }
]);

export function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
}

export default App;
