import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import screenfull from 'screenfull';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ThemeToggleComponent,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly showToggle = input(true);
  readonly toggleSidenav = output<void>();
  #authenticationService = inject(AuthenticationService);
  #router = inject(Router);
  isAuthenticated = this.#authenticationService.isAuthenticated;

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  logout() {
    this.#authenticationService.logout().subscribe({
      next: (response) => {
        this.#router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error revoking token:', error);
      },
    });
  }
}
