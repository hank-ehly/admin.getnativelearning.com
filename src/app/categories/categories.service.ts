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

    getCategories(): Observable<any[]> {
        return this.http.request('/categories?lang=en&require_subcategories=false', {method: RequestMethod.Get}).pluck('records');
    }

    getCategory(id: number): Observable<any> {
        return this.http.request('/categories/' + id, {method: RequestMethod.Get});
    }

    updateCategoryLocalized(categoryId: number, categoryLocalizedId: number, changes: any): Observable<boolean> {
        return this.http.request(`/categories/${categoryId}/categories_localized/${categoryLocalizedId}`, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }

    getSubcategory(categoryId: number, subcategoryId: number): Observable<any> {
        return this.http.request('/categories/' + categoryId + '/subcategories/' + subcategoryId, {method: RequestMethod.Get});
    }

    updateSubcategoryLocalized(subcategoryId: number, subcategoryLocalizedId: number, changes: any): Observable<boolean> {
        return this.http.request('/subcategories/' + subcategoryId + '/subcategories_localized/' + subcategoryLocalizedId, {
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

    createCategory(): Observable<boolean> {
        return this.http.request('/categories', {method: RequestMethod.Post}).map((r: any) => _.isNumber(r.id) ? r.id : false);
    }

    createSubcategory(categoryId: number): Observable<any | boolean> {
        return this.http.request(`/categories/${categoryId}/subcategories`, {
            method: RequestMethod.Post
        }).map((r: any) => {
            if (_.isNumber(r['id']) && _.isNumber(r['category_id'])) {
                return {
                    subcategoryId: r['id'],
                    categoryId: r['category_id']
                };
            }
            return false;
        });
    }

    deleteCategory(id: number): Observable<boolean> {
        return this.http.request(`/categories/${id}`, {method: RequestMethod.Delete}).map(_.isNull);
    }

    deleteSubcategory(categoryId: number, subcategoryId: number): Observable<boolean> {
        return this.http.request(`/categories/${categoryId}/subcategories/${subcategoryId}`, {method: RequestMethod.Delete}).map(_.isNull);
    }
}
