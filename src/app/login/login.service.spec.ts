import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LoginService } from './login.service';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [LoginService, HttpService, AuthService]
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
