import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    const kAuthTokenVal = 'kAuthToken';
    const kAuthExpireVal = '9996148743676';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
        localStorage.clear();
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should update the localStorage auth token values', inject([AuthService], (service: AuthService) => {
        service.updateAuthToken({'x-gn-auth-token': kAuthTokenVal, 'x-gn-auth-expire': kAuthExpireVal});
        expect(localStorage.getItem('x-gn-auth-token')).toEqual(kAuthTokenVal);
        expect(localStorage.getItem('x-gn-auth-expire')).toEqual(kAuthExpireVal);
    }));

    it('should return true if the user is authenticated', inject([AuthService], (service: AuthService) => {
        service.updateAuthToken({'x-gn-auth-token': kAuthTokenVal, 'x-gn-auth-expire': kAuthExpireVal});
        expect(service.isAuthenticated()).toBeTruthy();
    }));

    it('should return false if the user is not authenticated', inject([AuthService], (service: AuthService) => {
        expect(service.isAuthenticated()).toBeFalsy();
    }));

    it('should remove the auth token values from localStorage', inject([AuthService], (service: AuthService) => {
        service.updateAuthToken({'x-gn-auth-token': kAuthTokenVal, 'x-gn-auth-expire': kAuthExpireVal});
        service.deleteAuthToken();
        expect(service.isAuthenticated()).toBeFalsy();
    }));
});
