import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly #key = 'plan-flow-token';
  readonly #storageService = inject(LocalStorageService);
  readonly #httpClient = inject(HttpClient);

  token = signal(this.#storageService.get(this.#key)?.value ?? '');
  isAuthenticated = computed(() => (this.token() ?? '').length > 0);

  setToken(token: string) {
    this.token.set(token);
    console.log('Setting token:', this.token());
    console.log('isAuthenticated:', this.isAuthenticated());
    this.#storageService.set(this.#key, { value: token });
  }

  resetToken() {
    this.token.set('');
    this.#storageService.remove(this.#key);
  }

  logout() {
    return this.#httpClient
      .delete(`/tokens/${this.token()}`)
      .pipe(tap(() => this.resetToken()));
  }
}
