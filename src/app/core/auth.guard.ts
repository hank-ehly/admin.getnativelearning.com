import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'app/core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.auth.isAuthenticated();

        if (!isAuthenticated && state.url === '/login') {
            return true;
        }

        if (isAuthenticated && state.url === '/login') {
            return false;
        }

        if (!isAuthenticated) {
            this.router.navigate(['login']);
        }

        return isAuthenticated;
    }
}
