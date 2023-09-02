import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EditArticleService } from '../services/edit-article.service';
import { editArticleActions } from './actions';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';

export const editArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticle),
      switchMap(({ request, slug }) => {
        return editArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.editArticleSuccess({ article });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              editArticleActions.editArticleFailure({
                errors: error.error.errors,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError((error: HttpErrorResponse) =>
            of(editArticleActions.getArticleFailure())
          )
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  { functional: true, dispatch: false }
);
