import { Routes } from '@angular/router';
import { Blog } from './pages/blog/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/blog'
    },
    {
        path: 'blog', component: Blog
    },
    {
        path: 'login', component: Login
    },
    {
      // Nesse caso, quando acessar essa rota, vai aplicar as rodas do DashBoard de forma tardia, apenas quando acessar a rota
        path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.routes')
        .then((m) => m.ROUTES),
      canActivate:[authGuard] // define que para o pash /dashboard so pode acessar se o authGuard retornar true.
    }
];
