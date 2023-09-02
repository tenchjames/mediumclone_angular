import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/article-form.component';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
  },
];
