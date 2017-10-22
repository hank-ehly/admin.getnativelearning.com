import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService, kAuthToken, kAuthExpire } from './auth.service';
import { APIError } from './api-error';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class HttpService {
    constructor(private http: Http, private auth: AuthService) {
    }

    request(url: string, options: RequestOptionsArgs = {}): Observable<any> {
        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.set('Accept', 'application/json');

        if (url !== '/sessions') {
            options.headers.set('Authorization', 'Bearer ' + localStorage.getItem(kAuthToken));
        }

        return this.http.request(environment.apiUrl + url, options)
            .map(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this));
    }

    private handleResponse(response: Response): any {
        if (!_.inRange(response.status, 200, 400)) {
            this.handleError(response);
        }

        if (response.headers) {
            const data = {};
            data[kAuthToken] = response.headers.get(kAuthToken);
            data[kAuthExpire] = response.headers.get(kAuthExpire);
            this.auth.updateAuthToken(data);
        }

        if (_.inRange(response.status, 100, 200) || response.status === 204 || _.inRange(response.status, 300, 400)) {
            return null;
        }

        return response.json();
    }

    private handleError(response: Response): Observable<APIError[]> {
        let err;
        try {
            err = response.json();
        } catch (e) {
            err =  [{code: 'unknown', message: 'Failed to parse error response.'}];
        }
        return Observable.throw(err);
    }
}
