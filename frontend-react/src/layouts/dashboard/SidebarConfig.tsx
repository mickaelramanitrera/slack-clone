import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name: any) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill),
  },
];

export default sidebarConfig;
