// src/app/user/login/lazy/lazy.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-login',
  standalone: true,
  template: `
    <h1>Lazy Loaded Login Component</h1>
  `,
  imports: []
})
export class LazyLoginComponent {}
