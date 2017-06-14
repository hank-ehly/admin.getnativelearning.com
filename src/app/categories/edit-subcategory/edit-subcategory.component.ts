import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';

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
    subcategory: any;
    persistedSubcategory: any;
    editingIndices: number[] = [];
    updatingIndices: number[] = [];
    categories$: Observable<any>;
    selectedCategoryId: number;
    persistedCategoryId: number;
    isUpdatingCategory = false;

    private subscriptions: Subscription[] = [];

    constructor(private service: CategoriesService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.categories$ = this.service.getCategories();

        this.subscriptions.push(
            this.service.getSubcategory(
                this.route.snapshot.params.category_id,
                this.route.snapshot.params.subcategory_id
            ).subscribe(s => {
                this.subcategory = s;
                this.persistedSubcategory = _.cloneDeep(s);
                this.selectedCategoryId = s.category.id;
                this.persistedCategoryId = s.category.id;
            })
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSelectCategory(e: Event): void {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selectedCategoryId = +selectedOption.value;
    }

    isEditingIndex(i: number): boolean {
        return _.includes(this.editingIndices, i) && !_.includes(this.updatingIndices, i);
    }

    isUpdatingIndex(i: number): boolean {
        return _.includes(this.updatingIndices, i) && !_.includes(this.editingIndices, i);
    }

    editIndex(i: number): void {
        if (!this.isEditingIndex(i)) {
            this.editingIndices.push(i);
        }
    }

    cancelEditAtIndex(i: number): void {
        if (this.isEditingIndex(i)) {
            this.editingIndices.splice(this.editingIndices.indexOf(i), 1);
            this.subcategory.subcategories_localized.records[i].name = this.persistedSubcategory.subcategories_localized.records[i].name;
        }
    }

    updateNameAtIndex(i: number): void {
        if (this.isUpdatingIndex(i)) {
            return;
        }

        if (this.isEditingIndex(i)) {
            this.editingIndices.splice(this.editingIndices.indexOf(i), 1);
        }

        this.updatingIndices.push(i);

        const subLocalizedId = _.nth(this.subcategory.subcategories_localized.records, i).id;
        const changes = {name: _.nth(this.subcategory.subcategories_localized.records, i).name};

        const s = this.service.updateSubcategoryLocalized(this.subcategory.id, subLocalizedId, changes).subscribe((updated: boolean) => {
            if (updated) {
                this.persistedSubcategory.subcategories_localized.records[i].name =
                    this.subcategory.subcategories_localized.records[i].name;
            } else {
                this.subcategory.subcategories_localized.records[i].name =
                    this.persistedSubcategory.subcategories_localized.records[i].name;
            }
        }, null, () => {
            this.updatingIndices.splice(this.updatingIndices.indexOf(i), 1);
        });

        this.subscriptions.push(s);
    }

    onClickSubmitCategoryId(): void {
        this.isUpdatingCategory = true;
        const s = this.service.updateSubcategory(
            this.persistedCategoryId,
            this.persistedSubcategory.id,
            {category_id: this.selectedCategoryId}
        ).subscribe((updated: boolean) => {
            if (updated) {
                this.persistedCategoryId = this.selectedCategoryId;
            } else {
                this.selectedCategoryId = this.persistedCategoryId;
            }
        }, null, () => this.isUpdatingCategory = false);
        this.subscriptions.push(s);
    }
}
