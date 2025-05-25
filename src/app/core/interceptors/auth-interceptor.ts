import { HttpHandlerFn, HttpParams, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../../environments/environment.development';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthenticationService).token();
  const key = environment.apiKey;

  // Keeps the original request params. as a new HttpParams
  let newParams = new HttpParams({ fromString: req.params.toString() });

  // Add any params (can also chain .append() but I was conditionally adding params)
  newParams = newParams.append('key', key);
  newParams = newParams.append('token', authToken);

  // Clone the request with params instead of setParams
  const newReq = req.clone({
    params: newParams,
  });

  return next(newReq);
}
