import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                HttpService,
                AuthService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    it('should ...', inject([HttpService], (service: HttpService) => {
        expect(service).toBeDefined();
    }));

    it('should take url and request options arguments', inject([HttpService], (service: HttpService) => {
        expect(() => service.request('/test', {})).not.toThrow();
    }));
});
