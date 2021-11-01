import { ReactElement } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';

interface Props {
  element: any;
  children?: any;
}

function ProtectedElement({ element }: Props) {
  const isLoggedIn = false;

  return isLoggedIn ? element : <Navigate to="/login" replace />;
}

export default function Router(): ReactElement | null {
  return useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedElement element={<DashboardLayout />} />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: 'app',
          element: <ProtectedElement element={<DashboardApp />} />,
        },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
