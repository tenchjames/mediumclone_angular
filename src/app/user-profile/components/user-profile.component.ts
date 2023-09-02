import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { userProfileActions } from '../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { UserProfileInterface } from '../types/user-profile.interface';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = '';

  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(filter((user): user is CurrentUserInterface => Boolean(user))),
    userProfile: this.store
      .select(selectUserProfileData)
      .pipe(
        filter((userProfile): userProfile is UserProfileInterface =>
          Boolean(userProfile)
        )
      ),
  }).pipe(
    map(
      ({ userProfile, currentUser }) =>
        userProfile.username === currentUser.username
    )
  );

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    if (this.slug) {
      this.store.dispatch(
        userProfileActions.getUserProfile({ slug: this.slug })
      );
    }
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
