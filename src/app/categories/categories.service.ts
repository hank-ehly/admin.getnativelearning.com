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
        return this.http.request('/categories', {
            method: RequestMethod.Get
        }).pluck('records');
    }

    getCategory(id: number): Observable<any> {
        return this.http.request('/categories/' + id, {
            method: RequestMethod.Get
        });
    }

    getSubcategory(category_id: number, subcategory_id: number): Observable<any> {
        return this.http.request('/categories/' + category_id + '/subcategories/' + subcategory_id, {
            method: RequestMethod.Get
        });
    }

    updateCategory(id: number, changes: any): Observable<boolean> {
        return this.http.request('/categories/' + id, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }

    updateSubcategory(category_id: number, subcategory_id: number, changes: any): Observable<boolean> {
        return this.http.request('/categories/' + category_id + '/subcategories/' + subcategory_id, {
            method: RequestMethod.Patch,
            body: changes
        }).map(_.isNull);
    }
}
