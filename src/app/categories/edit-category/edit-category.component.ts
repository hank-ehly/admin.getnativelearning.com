import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    category$: Observable<any>;
    categoryName: string;
    subscriptions: Subscription[] = [];
    updateSuccess: boolean | null = null;
    categoryNameSubmitDisabled = true;

    private originalCategoryName: string;

    constructor(private categoryService: CategoriesService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.category$ = this.categoryService.getCategory(this.route.snapshot.params.id);
        this.subscriptions.push(this.category$.pluck('name').subscribe((name: string) => {
            this.categoryName = name;
            this.originalCategoryName = name;
        }));
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onInputCategoryName(e: Event): void {
        this.categoryNameSubmitDisabled = (<HTMLInputElement>e.target).value === this.originalCategoryName;
    }

    onSubmit(): void {
        this.categoryNameSubmitDisabled = true;
        const updateSub = this.categoryService.updateCategory(this.route.snapshot.params.id, {
            name: this.categoryName
        }).subscribe((result: boolean) => {
            this.updateSuccess = result;
            if (result) {
                this.originalCategoryName = this.categoryName;
            }
            this.categoryNameSubmitDisabled = true;
        });
        this.subscriptions.push(updateSub);
    }
}
