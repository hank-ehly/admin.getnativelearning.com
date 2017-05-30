import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(private http: HttpService) {
    }

    login(credentials: { email: string, password: string }): Observable<void> {
        return this.http.request('/sessions', {
            method: RequestMethod.Post,
            body: credentials
        });
    }
}
