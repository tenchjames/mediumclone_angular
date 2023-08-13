import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backend-errors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backEndErrors: BackendErrorsInterface = {};
  errorMessages: string[] = [];
  constructor() {}
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backEndErrors).map((name: string) => {
      const messages = this.backEndErrors[name].join(', ');
      return `${name} ${messages}`;
    });
  }
}
