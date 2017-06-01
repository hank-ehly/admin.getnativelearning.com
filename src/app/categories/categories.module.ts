import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriesService } from './categories.service';
import { CategoriesComponent } from './categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoriesIndexComponent } from './categories-index/categories-index.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        CategoriesComponent,
        EditCategoryComponent,
        CategoriesIndexComponent
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule {
}
