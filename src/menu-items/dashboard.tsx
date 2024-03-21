// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
  IconDashboard: IconDashboard,
  IconDeviceAnalytics: IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.IconDashboard,
  type: 'group',
  children: [
    {
      id: 'analytics',
      title: <FormattedMessage id="analytics" />,
      type: 'item',
      url: '/admin/dashboard/analytics',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false
    }

  ]
};

export default dashboard;
