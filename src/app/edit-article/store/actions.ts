import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const editArticleActions = createActionGroup({
  source: 'Edit Article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: ArticleInterface }>(),
    'Get article failure': emptyProps(),

    'Edit article': props<{ slug: string; request: ArticleRequestInterface }>(),
    'Edit article success': props<{ article: ArticleInterface }>(),
    'Edit article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
