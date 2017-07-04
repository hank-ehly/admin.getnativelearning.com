import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VideoComponent } from './video/video.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { CategoriesIndexComponent } from './categories/categories-index/categories-index.component';
import { EditSubcategoryComponent } from './categories/edit-subcategory/edit-subcategory.component';
import { NewVideoComponent } from './video/new/new.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { IndexSpeakerComponent } from './speaker/index/index.component';
import { ShowSpeakerComponent } from './speaker/show/show.component';
import { NewSpeakerComponent } from './speaker/new/new.component';
import { EditSpeakerComponent } from './speaker/edit/edit.component';

const routes: Routes = [
    {
        path: 'videos',
        component: VideoComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'new',
                component: NewVideoComponent
            }
        ]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: CategoriesIndexComponent
            },
            {
                path: ':id/edit',
                component: EditCategoryComponent
            },
            {
                path: ':category_id/subcategories/:subcategory_id/edit',
                component: EditSubcategoryComponent
            }
        ]
    },
    {
        path: 'speakers',
        component: SpeakerComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: IndexSpeakerComponent
            },
            {
                path: 'new',
                component: NewSpeakerComponent
            },
            {
                path: ':id/edit',
                component: EditSpeakerComponent
            },
            {
                path: ':id',
                component: ShowSpeakerComponent
            }
        ]
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
