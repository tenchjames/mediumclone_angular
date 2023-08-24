import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-loading',
  template: '<div>Loading...</div>',
  standalone: true,
})
export class LoadingComponent {
  @Input() message: string = 'Something went wrong';
}
