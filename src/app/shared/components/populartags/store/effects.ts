import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { popularTagActions } from './actions';
import { PopularTagsService } from 'src/app/shared/services/popular-tags.service';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

export const getFeedEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagsService)
  ) => {
    return actions$.pipe(
      ofType(popularTagActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagActions.getPopularTagsSuccess({
              popularTags,
            });
          }),
          catchError(() => of(popularTagActions.getPopularTagsFailure()))
        );
      })
    );
  },
  { functional: true }
);
