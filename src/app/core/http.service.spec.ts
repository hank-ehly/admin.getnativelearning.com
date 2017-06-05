import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response, RequestMethod } from '@angular/http';
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

    it('should return the error object if an error occurs', inject([HttpService, MockBackend],
        (service: HttpService, mockBackend: MockBackend) => {
            const mockErrBody = [
                {
                    message: 'No resource was found for the given conditions',
                    code: 'ResourceNotFound'
                }
            ];

            const mockErrResponse = new Response(
                new ResponseOptions({
                    status: 404,
                    body: mockErrBody
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockErrResponse));

            service.request('/categories/1', {
                method: RequestMethod.Patch,
                body: {
                    name: 'new name'
                }
            }).subscribe(res => {
                expect(res).toEqual(mockErrBody);
            });
        }));
});
