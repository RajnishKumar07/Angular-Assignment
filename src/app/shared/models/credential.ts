import { ILoginRes } from './login';

export interface ICredential
  extends Omit<ILoginRes, 'accessToken' | 'refreshToken'> {}
