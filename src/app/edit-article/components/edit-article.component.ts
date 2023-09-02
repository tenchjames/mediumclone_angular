import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/components/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from '../store/reducers';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';
import { CommonModule } from '@angular/common';
import { editArticleActions } from '../store/actions';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => ({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    }))
  );

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  vm$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    article: this.store.select(selectArticle),
    initialValues: this.initialValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleInput,
    };
    this.store.dispatch(
      editArticleActions.editArticle({ request, slug: this.slug })
    );
  }
}
