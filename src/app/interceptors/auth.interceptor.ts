import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders: {
      'X-RapidAPI-Key': environment.XRapidAPIKey,
      'X-RapidAPI-Host': environment.XRapidAPIHost
    }
  })
  return next(request);
};
