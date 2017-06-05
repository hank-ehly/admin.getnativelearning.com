import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CategoriesIndexComponent } from './categories-index/categories-index.component';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CategoriesComponent,
        EditCategoryComponent,
        CategoriesIndexComponent,
        EditSubcategoryComponent
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule {
}
