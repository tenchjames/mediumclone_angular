import { createActionGroup, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../types/login-request.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
