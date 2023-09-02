import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddToFavoritesService } from './services/add-to-favorites.service';
import { addToFavoritesAction } from './store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  handleLike() {
    this.store.dispatch(
      addToFavoritesAction.addToFavorites({
        slug: this.articleSlug,
        isFavorited: this.isFavorited,
      })
    );
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.favoritesCount++;
    } else {
      this.favoritesCount--;
    }
  }
}
