import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-subcategory',
    templateUrl: './edit-subcategory.component.html',
    styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit, OnDestroy {
    subcategory$: BehaviorSubject<any>;
    subcategoryNameModel: string;

    categories$: Observable<any>;
    currentCategoryId: number;

    private subscriptions: Subscription[] = [];

    constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) {
        this.currentCategoryId = route.snapshot.params.category_id;
        this.subcategory$ = new BehaviorSubject<any>(null);
    }

    ngOnInit(): void {
        this.categories$ = this.categoriesService.getCategories();

        this.subscriptions.push(
            this.categoriesService.getSubcategory(
                this.route.snapshot.params.category_id,
                this.route.snapshot.params.subcategory_id
            ).subscribe(subcategory => {
                this.subcategory$.next(subcategory);
            })
        );

        this.subscriptions.push(
            this.subcategory$.filter(_.isPlainObject).pluck('name').subscribe((name: string) => {
                this.subcategoryNameModel = name;
            })
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
