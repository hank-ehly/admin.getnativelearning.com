import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { IndexCategoryComponent } from './index/index.component';
import { EditCategoryComponent } from './edit/edit.component';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        CategoriesComponent,
        EditCategoryComponent,
        IndexCategoryComponent,
        EditSubcategoryComponent
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule {
}
