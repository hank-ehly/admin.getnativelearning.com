import { Component } from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
    selector: 'gn-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isAuthenticated$ = this.auth.isAuthenticatedEmitted$;

    constructor(private auth: AuthService) {
    }
}
