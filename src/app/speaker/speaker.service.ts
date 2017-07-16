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

    getSpeakers(): Observable<any[]> {
        return this.http.request('/speakers', {method: RequestMethod.Get}).pluck('records');
    }

    getSpeaker(id: number): Observable<any> {
        return this.http.request(`/speakers/${id}`, {method: RequestMethod.Get});
    }

    getSpeakerLocalizations(id: number): Observable<any[]> {
        return this.http.request(`/speakers/${id}/speakers_localized`, {method: RequestMethod.Get}).pluck('records');
    }

    createSpeaker(body: any): Observable<any> {
        return this.http.request('/speakers', {method: RequestMethod.Post, body: body});
    }

    updateSpeaker(id: number, body: any): Observable<any> {
        return this.http.request('/speakers/' + id, {method: RequestMethod.Patch, body: body});
    }

    deleteSpeaker(id: number): Observable<any> {
        return this.http.request('/speakers/' + id, {method: RequestMethod.Delete});
    }
}
