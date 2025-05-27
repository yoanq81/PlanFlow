import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export function baseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (req.url.includes('openai')) {
    return next(req);
  }

  // Inject the current `AuthService` and use it to get an authentication token:
  const baseUrl = environment.apiUrl;

  // Clone the request with new url
  const newReq = req.clone({
    url: `${baseUrl}/${req.url}`,
  });

  return next(newReq);
}
