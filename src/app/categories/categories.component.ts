import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './categories.service';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'gn-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    title = 'Categories';
    categories$: Observable<any>;
    deleteButtonTitle = 'To delete a category, first delete all subcategories';

    constructor(private categoryService: CategoriesService) {
    }

    ngOnInit() {
        this.categories$ = this.categoryService.getCategories();
    }
}
