
export enum Screen {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  CLOCK_CONFIRM = 'CLOCK_CONFIRM',
  REQUESTS = 'REQUESTS',
  DOCUMENTS = 'DOCUMENTS',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  ASSISTANT = 'ASSISTANT',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_SITE_DETAIL = 'ADMIN_SITE_DETAIL'
}

export interface User {
  name: string;
  role: 'Employee' | 'Admin' | 'Artisan';
  avatar: string;
  email: string;
  matricola: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
