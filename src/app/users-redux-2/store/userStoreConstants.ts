import { IUser } from '@/app/api/v1/users/userModel';

export const baseIUser: IUser = {
  _id: '',
  name: '',
  email: '',
  passCode: '',
  alias: '',
  role: 'user',
};
