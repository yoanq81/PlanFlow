import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule],
  templateUrl: './callback.component.html',
})
export default class CallbackComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  #authenticationService = inject(AuthenticationService);
  error = signal('');

  ngOnInit(): void {
    const fragment = this.#route.snapshot.fragment;
    if (fragment) {
      const access_token = new URLSearchParams(fragment).get('token');
      const error = new URLSearchParams(fragment).get('error');

      if (error) {
        this.error.set(error);
        this.#authenticationService.setToken('');
        return;
      }

      this.#authenticationService.setToken(access_token!);
      this.#router.navigate(['/dashboard']);
    } else {
      this.error.set('No se encuentra el token en la URL');
      this.#authenticationService.setToken('');
    }
  }

  goToLogin() {
    this.#router.navigate(['/login']);
  }
}
