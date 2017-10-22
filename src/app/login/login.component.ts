import { Component, OnDestroy } from '@angular/core';

import { LoginService } from './login.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
    credentials = {email: '', password: ''};
    requestInProgress = false;
    emailRegex = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    private subscriptions: Subscription[] = [];

    constructor(private loginService: LoginService) {
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSubmit(): void {
        this.requestInProgress = true;
        const loginSubscription = this.loginService.login(this.credentials).subscribe(() => {
            this.requestInProgress = false;
            location.href = '';
        }, (e: any) => {
            this.requestInProgress = false;
            console.log('ERROR', e);
        });
        this.subscriptions.push(loginSubscription);
    }
}
