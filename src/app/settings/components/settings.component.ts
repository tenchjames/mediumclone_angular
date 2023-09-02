import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, filter } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  selectCurrentUser,
  selectIsSubmitting,
} from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';
import { selectValidationErrors } from '../store/reducers';
import { CurrentUserRequestInterface } from 'src/app/shared/types/current-request.interface';
import { authActions } from 'src/app/auth/store/actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, CommonModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  currentUser?: CurrentUserInterface | null;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(
        select(selectCurrentUser),
        filter(Boolean as any as BooleanConstructor)
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  onSubmit(): void {
    if (!this.currentUser) {
      throw new Error('currentUser is undefined');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('currentUser is undefined');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }
}
