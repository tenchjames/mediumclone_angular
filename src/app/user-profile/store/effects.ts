import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { userProfileActions } from './actions';
import { Router } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile) => {
            return userProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
