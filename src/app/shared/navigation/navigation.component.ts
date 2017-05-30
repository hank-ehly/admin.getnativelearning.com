import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'gn-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    constructor(private auth: AuthService, private router: Router) {
    }

    onClickLogout(): void {
        this.auth.deleteAuthToken();
        this.router.navigate(['/login']);
    }
}
