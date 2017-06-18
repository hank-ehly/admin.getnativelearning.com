import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-categories-index',
    templateUrl: './categories-index.component.html',
    styleUrls: ['./categories-index.component.scss']
})
export class CategoriesIndexComponent implements OnInit, OnDestroy {
    categories$: Observable<any>;
    deleteButtonTitle = 'To delete a category, first delete all subcategories';
    deleteConfirmMessage = 'Are you sure?';

    subscriptions: Subscription[] = [];

    constructor(private categoryService: CategoriesService, private router: Router) {
    }

    ngOnInit(): void {
        this.categories$ = this.categoryService.getCategories();
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onClickCreateNewCategory(): void {
        this.subscriptions.push(
            this.categoryService.createCategory().subscribe((res: any) => {
                console.log(res);
                if (res && _.isNumber(res)) {
                    this.router.navigate(['categories', res, 'edit']);
                }
            })
        );
    }

    onClickDeleteCategory(category: any): void {
        const confirmed = window.confirm(this.deleteConfirmMessage);

        if (!confirmed) {
            return;
        }

        console.log('Todo: Delete request');
    }
}
