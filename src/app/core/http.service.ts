import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService, kAuthToken, kAuthExpire } from './auth.service';

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

        return this.http.request(environment.apiUrl + url, options).map((response: Response) => {
            if (response.headers) {
                const data = {};
                data[kAuthToken] = response.headers.get(kAuthToken);
                data[kAuthExpire] = response.headers.get(kAuthExpire);
                this.auth.updateAuthToken(data);
            }
            return response.json();
        });
    }
}
