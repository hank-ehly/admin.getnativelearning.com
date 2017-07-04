import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class SpeakerService {
    constructor(private http: HttpService) {
    }

    getGenders(): Observable<any[]> {
        return this.http.request('/genders', {method: RequestMethod.Get}).pluck('records');
    }
}
