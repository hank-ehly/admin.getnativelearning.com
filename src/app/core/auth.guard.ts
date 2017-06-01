import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from 'app/core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
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

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}
