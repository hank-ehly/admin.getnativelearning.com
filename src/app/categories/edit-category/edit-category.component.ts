import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'gn-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    category$: Observable<any>;

    constructor(private categoryService: CategoriesService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.category$ = this.categoryService.getCategory(this.route.snapshot.params.id);
    }
}
