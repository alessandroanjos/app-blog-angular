import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import Auth from '../services/auth';


/**
 * Cria uma funcao anonomia para fazer a guardas das rotas se a pessoa poe ou nao ṕde acessar.
 * @param route
 * @param state
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  return auth.isAuthenticated();
};
