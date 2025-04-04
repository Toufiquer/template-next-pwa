import { IUser } from '@/app/api/v1/6template/7filenameModel';

type PartialIUser = Pick<IUser, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const pageLimitArr: number[] = [2, 10, 50, 100, 200];
export const userRole = ['user', 'admin', 'moderator'];
export type IUserRole = 'user' | 'admin' | 'moderator';
export const defaultUserData = { name: '', email: '', passCode: '', alias: '', role: 'user' };
export const defaultUserRole = 'user';
export const baseIUser: PartialIUser = {
  _id: '',
  name: '',
  email: '',
  passCode: '',
  alias: '',
  role: defaultUserRole,
};
