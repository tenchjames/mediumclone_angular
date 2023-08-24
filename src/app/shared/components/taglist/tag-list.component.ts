import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popular-tag.type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  standalone: true,
  imports: [NgFor],
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
