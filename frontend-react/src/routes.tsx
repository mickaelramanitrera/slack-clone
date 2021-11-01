import { ReactElement } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import Channel from './pages/Channel';

import useUserConnected from './hooks/useUserConnected';

interface Props {
  element: any;
  children?: any;
}

function ProtectedElement({ element }: Props) {
  const { user } = useUserConnected();
  return user !== undefined ? element : <Navigate to="/login" replace />;
}

function SmartLogin({ element }: Props) {
  const { user } = useUserConnected();
  return user !== undefined ? <Navigate to="/dashboard/app" replace /> : element;
}

export default function Router(): ReactElement | null {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: 'app',
          element: <ProtectedElement element={<DashboardApp />} />,
        },
        {
          path: 'channel/:id',
          element: <ProtectedElement element={<Channel />} />,
        },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <SmartLogin element={<Login />} /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <ProtectedElement element={<Navigate to="/dashboard/app" replace />} /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" /> },
  ]);
}
