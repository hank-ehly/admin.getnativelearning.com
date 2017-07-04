import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosComponent } from './videos/videos.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { CategoriesIndexComponent } from './categories/categories-index/categories-index.component';
import { EditSubcategoryComponent } from './categories/edit-subcategory/edit-subcategory.component';
import { NewVideoComponent } from './videos/new-video/new-video.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { IndexSpeakerComponent } from './speaker/index-speaker/index-speaker.component';
import { ShowSpeakerComponent } from './speaker/show-speaker/show-speaker.component';
import { NewSpeakerComponent } from './speaker/new-speaker/new-speaker.component';
import { EditSpeakerComponent } from './speaker/edit-speaker/edit-speaker.component';

const routes: Routes = [
    {
        path: 'videos',
        component: VideosComponent,
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
                path: ':id',
                component: ShowSpeakerComponent
            },
            {
                path: '/new',
                component: NewSpeakerComponent
            },
            {
                path: ':id/edit',
                component: EditSpeakerComponent
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
