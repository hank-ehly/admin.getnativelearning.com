import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class CollocationService {
    constructor(private http: HttpService) {
    }

    getCollocationOccurrencesForVideoId(id: number): Observable<any> {
        return this.http.request('/videos/' + id + '/collocation_occurrences', {
            method: RequestMethod.Get
        }).pluck('records');
    }

    getCollocationOccurrenceById(id: number): Observable<any> {
        return this.http.request('/collocation_occurrences/' + id, {
            method: RequestMethod.Get
        });
    }

    updateCollocationOccurrence(id: number, body: any): Observable<any> {
        return this.http.request('/collocation_occurrences/' + id, {
            method: RequestMethod.Patch,
            body: body
        });
    }

    updateUsageExample(id: number, body: any): Observable<any> {
        return this.http.request('/usage_examples/' + id, {
            method: RequestMethod.Patch,
            body: body
        });
    }

    createUsageExample(id: number, body: any): Observable<any> {
        return this.http.request(`/collocation_occurrences/${id}/usage_examples`, {
            method: RequestMethod.Post,
            body: body
        });
    }

    deleteUsageExample(id: number): Observable<any> {
        return this.http.request(`/usage_examples/${id}`, {
            method: RequestMethod.Delete
        });
    }
}
