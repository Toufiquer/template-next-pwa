import { I_3_template_ } from '@/app/api/v1/6template/filename7Model';

type PartialI_3_template_ = Pick<I_3_template_, '_id' | 'name' | 'email' | 'passCode' | 'alias' | 'role'>;

export const pageLimitArr: number[] = [2, 10, 50, 100, 200];
export const _4_template_Role = ['_4_template_', 'admin', 'moderator'];
export type I_3_template_Role = '_4_template_' | 'admin' | 'moderator';
export const default_3_template_Data = { name: '', email: '', passCode: '', alias: '', role: '_4_template_' };
export const default_3_template_Role = '_4_template_';
export const baseI_3_template_: PartialI_3_template_ = {
  _id: '',
  name: '',
  email: '',
  passCode: '',
  alias: '',
  role: default_3_template_Role,
};
