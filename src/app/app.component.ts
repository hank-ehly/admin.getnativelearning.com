import { Component } from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
    selector: 'gn-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isAuthenticated$ = this.auth.isAuthenticatedEmitted$;

    constructor(private auth: AuthService) {
    }
}
