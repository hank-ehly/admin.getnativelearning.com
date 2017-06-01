import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

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
}
