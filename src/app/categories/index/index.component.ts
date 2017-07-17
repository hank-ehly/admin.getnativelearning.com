import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Component({
    selector: 'gn-categories-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexCategoryComponent implements OnInit, OnDestroy {
    categories: any[];
    deleteButtonTitle = 'To delete a category, first delete all subcategories';
    deleteConfirmMessage = 'Are you sure?';
    deletingCategoryIds: number[] = [];

    subscriptions: Subscription[] = [];

    constructor(private categoryService: CategoriesService, private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.categoryService.getCategories().subscribe((categories: any[]) => this.categories = categories)
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onClickCreateNewCategory(): void {
        this.subscriptions.push(
            this.categoryService.createCategory().filter(_.isNumber).subscribe((res: any) => {
                this.router.navigate(['categories', res, 'edit']);
            })
        );
    }

    onClickDeleteCategory(category: any): void {
        if (!window.confirm(this.deleteConfirmMessage)) {
            return;
        }

        this.deletingCategoryIds.push(category.id);

        this.subscriptions.push(
            this.categoryService.deleteCategory(category.id).subscribe((deleted: boolean) => {
                if (deleted) {
                    this.categories.splice(_.findIndex(this.categories, {id: category.id}), 1);
                }
            }, null, () => {
                this.deletingCategoryIds.splice(category.id, 1);
            })
        );
    }

    isDeletingCategory(category: any): boolean {
        return _.includes(this.deletingCategoryIds, category.id);
    }
}
