import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { addToFavoritesAction } from './actions';
import { AddToFavoritesService } from '../services/add-to-favorites.service';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesAction.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article) => {
            return addToFavoritesAction.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesAction.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
