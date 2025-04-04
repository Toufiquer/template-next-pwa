import { IUser } from '@/app/api/v1/users/userModel';

type PartialIUser = Pick<IUser, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const baseIUser: PartialIUser = {
  _id: '',
  name: '',
  email: '',
  passCode: '',
  alias: '',
  role: 'user',
};
