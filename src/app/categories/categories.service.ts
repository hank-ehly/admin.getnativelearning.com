import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class CategoriesService {

    constructor(private http: HttpService) {
    }

    getCategories(): Observable<any> {
        return this.http.request('/categories?lang=en', {
            method: RequestMethod.Get
        }).pluck('records');
    }

    getCategory(id: number): Observable<any> {
        return this.http.request('/categories/' + id, {
            method: RequestMethod.Get
        });
    }

    updateCategoryLocalized(categoryId: number, categoryLocalizedId: number, changes: any): Observable<boolean> {
        return this.http.request(`/categories/${categoryId}/categories_localized/${categoryLocalizedId}`, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }

    getSubcategory(category_id: number, subcategory_id: number): Observable<any> {
        return this.http.request('/categories/' + category_id + '/subcategories/' + subcategory_id, {
            method: RequestMethod.Get
        });
    }

    updateSubcategoryLocalized(subcategory_id: number, subcategory_localized_id: number, changes: any): Observable<boolean> {
        return this.http.request('/subcategories/' + subcategory_id + '/subcategories_localized/' + subcategory_localized_id, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }

    updateSubcategory(categoryId: number, subcategoryId: number, changes: any): Observable<boolean> {
        return this.http.request(`/categories/${categoryId}/subcategories/${subcategoryId}`, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }
}
