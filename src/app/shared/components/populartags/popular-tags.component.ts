import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagActions } from './store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  setlectPopularsTagsData,
} from './store/reducers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
})
export class PopularTagsComponent implements OnInit {
  vm$ = combineLatest({
    tags: this.store.select(setlectPopularsTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(popularTagActions.getPopularTags());
  }
}
