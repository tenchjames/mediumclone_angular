import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/global-feed/global-feed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('src/app/your-feed/your-feed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tag-feed/tag-feed.routes').then((m) => m.routes),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('src/app/create-article/create-article.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('src/app/article/article.routes').then((m) => m.routes),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('src/app/edit-article/edit-article.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('src/app/user-profile/user-profile.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('src/app/user-profile/user-profile.routes').then((m) => m.routes),
  },
];
