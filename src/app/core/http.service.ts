import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, kAuthToken, kAuthExpire } from './auth.service';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: Http, private auth: AuthService, private router: Router) {
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

                if (response.headers.get('location')) {
                    this.router.navigateByUrl(response.headers.get('location'));
                }
            }
            return response.json();
        });
    }
}
