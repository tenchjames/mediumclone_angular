import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backEndErrors: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    console.log(this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
