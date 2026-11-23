import { Routes } from '@angular/router';
import { Blog } from './pages/blog/blog';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/blog'
    },

    {
        path: 'blog', component: Blog
    },
    {
      // Nesse caso, quando acessar essa rota, vai aplicar as rodas do DashBoard de forma tardia, apenas quando acessar a rota
        path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.routes')
        .then((m) => m.ROUTES),
    }
];
