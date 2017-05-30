import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const [kAuthToken, kAuthExpire] = ['x-gn-auth-token', 'x-gn-auth-expire'];

@Injectable()
export class AuthService {
    isAuthenticatedEmitted$: Observable<boolean>;
    private emitIsAuthenticatedSource: BehaviorSubject<boolean>;

    constructor() {
        this.emitIsAuthenticatedSource = new BehaviorSubject<boolean>(
            localStorage.getItem(kAuthToken) && +localStorage.getItem(kAuthExpire) > Date.now());
        this.isAuthenticatedEmitted$ = this.emitIsAuthenticatedSource.asObservable();
    }

    updateAuthToken(data: any) {
        localStorage.setItem(kAuthToken, data[kAuthToken]);
        localStorage.setItem(kAuthExpire, data[kAuthExpire]);
        this.emitIsAuthenticatedSource.next(true);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem(kAuthToken) && +localStorage.getItem(kAuthExpire) > Date.now();
    }

    deleteAuthToken(): void {
        localStorage.removeItem(kAuthToken);
        localStorage.removeItem(kAuthExpire);
        this.emitIsAuthenticatedSource.next(false);
    }
}
