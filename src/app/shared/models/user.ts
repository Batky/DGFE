export interface MenuItems {
  root: boolean;
  localAdministrator: boolean;
  userManagement: boolean;
  rolesManagement: boolean;
}

export interface User {
  id: number;
  name: string;
  login: string;
  middleName: string;
  lastName: string;
  department: string;
  email: string;
  validToDateTime: string;
  allowedItems: MenuItems;
  password: number;
  accessCard: string;
}
