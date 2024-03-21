// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types';

// assets
import {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
} from '@tabler/icons-react';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconFileInvoice,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| MENU ITEMS - APPLICATION ||============================== //

const application: NavItemType = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'user',
      title: <FormattedMessage id="User" />,
      type: 'item',
      url: "/admin/application/user",
      icon: icons.IconUserCheck,
      breadcrumbs: false
    },
    {
      id: 'history',
      title: <FormattedMessage id="History" />,
      type: 'collapse',
      icon: icons.IconFileInvoice,
      children: [
        {
          id: 'transaction',
          title: <FormattedMessage id="Transaction" />,
          breadcrumbs: false,
          type: 'item',
          url: '/admin/application/history/transaction'
        },
        {
          id: 'order',
          title: <FormattedMessage id="Order" />,
          type: 'item',
          breadcrumbs: false,
          url: '/admin/application/history/order'
        },
      
      ]
    },
  ]
};

export default application;
