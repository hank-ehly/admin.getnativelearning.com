import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../categories.service';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'gn-categories-index',
    templateUrl: './categories-index.component.html',
    styleUrls: ['./categories-index.component.scss']
})
export class CategoriesIndexComponent implements OnInit {
    categories$: Observable<any>;
    deleteButtonTitle = 'To delete a category, first delete all subcategories';

    constructor(private categoryService: CategoriesService) {
    }

    ngOnInit() {
        this.categories$ = this.categoryService.getCategories();
    }
}
