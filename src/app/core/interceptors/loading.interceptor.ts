import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Check for a custom attribute
  // to avoid showing loading spinner
  if (req.context.get(SkipLoading)) {
    // Pass the request directly to the next handler
    return next(req);
  }
  const loadingService = inject(LoadingService);

  // Turn on the loading spinner
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner
      loadingService.loadingOff();
    })
  );
};
