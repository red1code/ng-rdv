import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'components/dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components/user-space',
        loadChildren: () => import('./components/user-space/user-space.module').then(m => m.UserSpaceModule)
    }, {
        path: 'components/auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
