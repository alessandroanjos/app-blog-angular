import { HttpInterceptorFn } from '@angular/common/http';
import Auth from '../services/auth';
import { inject } from '@angular/core';

/**
 *
 * @param req o objeto de requisicao para o backend
 * @param next - cadeia de interceptors
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth)

  /**
   * na url de login nao terei o token
   * e estou autenticado
   */
  if(req.url !== '/login' && auth.isAuthenticated()){
    const newReq = req.clone({
      setHeaders: { Authorization: `Bearer ${auth.getToken()}`}
    });
    return next(newReq);
  }
  return next(req);
};
