import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/components/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';
import { createArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  vm$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  onSubmit(articleInput: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleInput,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
