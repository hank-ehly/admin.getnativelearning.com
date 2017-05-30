import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosComponent } from './videos/videos.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
    {
        path: 'videos',
        component: VideosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
