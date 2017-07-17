import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-category',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    category: any;
    persistedCategory: any;
    categoryId: number;
    editingIndices: number[] = [];
    updatingIndices: number[] = [];
    subscriptions: Subscription[] = [];
    deleteConfirmMessage = 'Are you sure?';
    deletingSubcategoryIds: number[] = [];

    constructor(private categoryService: CategoriesService, private route: ActivatedRoute, private router: Router) {
        this.categoryId = route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.categoryService.getCategory(this.route.snapshot.params['id']).subscribe(c => {
                this.category = c;
                this.persistedCategory = _.cloneDeep(c);
            })
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    isEditingIndex(i: number) {
        return _.includes(this.editingIndices, i) && !_.includes(this.updatingIndices, i);
    }

    isUpdatingIndex(i: number) {
        return _.includes(this.updatingIndices, i) && !_.includes(this.editingIndices, i);
    }

    editIndex(i: number) {
        if (!this.isEditingIndex(i)) {
            this.editingIndices.push(i);
        }
    }

    cancelEditAtIndex(i: number) {
        if (this.isEditingIndex(i)) {
            this.editingIndices.splice(this.editingIndices.indexOf(i), 1);
            this.category.categories_localized.records[i].name = this.persistedCategory.categories_localized.records[i].name;
        }
    }

    updateNameAtIndex(i: number) {
        if (this.isUpdatingIndex(i)) {
            return;
        }

        if (this.isEditingIndex(i)) {
            this.editingIndices.splice(this.editingIndices.indexOf(i), 1);
        }

        this.updatingIndices.push(i);

        this.subscriptions.push(
            this.categoryService.updateCategoryLocalized(this.categoryId, _.nth(this.category.categories_localized.records, i)['id'], {
                name: _.nth(this.category.categories_localized.records, i)['name']
            }).subscribe((updated: any) => {
                if (updated) {
                    this.persistedCategory.categories_localized.records[i]['name'] = this.category.categories_localized.records[i]['name'];
                } else {
                    this.category.categories_localized.records[i]['name'] = this.persistedCategory.categories_localized.records[i]['name'];
                }
            }, () => {
                this.category.categories_localized.records[i]['name'] = this.persistedCategory.categories_localized.records[i]['name'];
                this.updatingIndices.splice(this.updatingIndices.indexOf(i), 1);
            }, () => {
                this.updatingIndices.splice(this.updatingIndices.indexOf(i), 1);
            })
        );
    }

    onClickCreateNewSubcategory(): void {
        this.subscriptions.push(
            this.categoryService.createSubcategory(this.categoryId).subscribe((res: any) => {
                if (res.categoryId && res.subcategoryId) {
                    this.router.navigate(['categories', res.categoryId, 'subcategories', res.subcategoryId, 'edit']);
                }
            })
        );
    }

    isDeletingSubcategory(subcategory: any): boolean {
        return _.includes(this.deletingSubcategoryIds, subcategory['id']);
    }

    onClickDeleteSubcategory(subcategory: any): void {
        if (!window.confirm(this.deleteConfirmMessage)) {
            return;
        }

        this.deletingSubcategoryIds.push(subcategory.id);

        this.subscriptions.push(
            this.categoryService.deleteSubcategory(this.categoryId, subcategory.id).subscribe((deleted: boolean) => {
                if (deleted) {
                    this.category.subcategories.records.splice(_.findIndex(this.category.subcategories, {id: subcategory.id}), 1);
                    this.category.subcategories.count--;
                }
            }, null, () => {
                this.deletingSubcategoryIds.splice(subcategory.id, 1);
            })
        );
    }
}
