import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent implements OnInit {
  detectRouteTransitions = input(false);
#loadingService = inject(LoadingService);
#router = inject(Router);
  loading$ = this.#loadingService.loading$;

  ngOnInit() {
    if (this.detectRouteTransitions()) {
      this.#router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.#loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.#loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}