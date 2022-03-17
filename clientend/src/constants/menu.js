import { adminRoot } from './config';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
  },
  {
    id: 'sports',
    icon: 'iconsminds-shop-4',
    label: 'Liked Sports',
    to: `${adminRoot}/dashboards/user/liked/sports`,
  },
];
export default data;
