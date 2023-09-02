import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileStateInterface {
  isLoading: boolean;
  error: string | null;
  data: UserProfileInterface | null;
}
