import { CurrentUserInterface } from './current-user.interface';

export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & { password: string };
}
