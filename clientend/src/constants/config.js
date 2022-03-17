import { UserRole } from "@/utils/auth.roles";

export const defaultMenuType = 'menu-default';
export const adminRoot = '/app';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;

export const defaultLocale = 'en';
export const defaultDirection = 'ltr';
export const localeOptions = [
  { id: 'en', name: 'English LTR', direction: 'ltr' },
  { id: 'enrtl', name: 'English RTL', direction: 'rtl' },
];

export const currentUser = {
  id: 1,
  title: 'XXXXy',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const isAuthGuardActive = true;
export const themeRadiusStorageKey = 'theme_radius';
export const themeSelectedColorStorageKey = 'theme_selected_color';
export const defaultColor = 'light.redruby';
export const colors = ['bluenavy'];
