import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: Http) {
    }

    request(url: string, options: RequestOptionsArgs = {}): Observable<any> {
        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.set('Accept', 'application/json');

        return this.http.request(environment.apiUrl + url, options).map((response: Response) => {
            return response.json();
        });
    }
}
