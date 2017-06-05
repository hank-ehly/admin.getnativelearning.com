import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';
import { LoginService } from './login.service';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                LoginService,
                HttpService,
                AuthService,
                {provide: Router, useClass: RouterStub}
            ]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));

    it('should require a credentials argument containing email & password strings', inject([LoginService], (service: LoginService) => {
        const credentials = {email: '', password: ''};
        expect(() => service.login(credentials)).not.toThrow();
    }));

    it('should return an Observable', inject([LoginService], (service: LoginService) => {
        const credentials = {email: '', password: ''};
        expect(service.login(credentials).constructor.name).toEqual('Observable');
    }));
});
