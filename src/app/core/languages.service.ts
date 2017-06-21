import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class LanguagesService {
    constructor(private http: HttpService) {
    }

    getLanguages(): Observable<any> {
        return this.http.request('/languages', {method: RequestMethod.Get}).pluck('records');
    }
}
