import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { LanguagesService } from './languages.service';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions } from '@angular/http';
import { MockApiResponse_LanguagesIndex } from '../testing/mock-api-responses/languages-index';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

describe('LanguagesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                HttpService,
                LanguagesService,
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

    it('should be created', inject([LanguagesService], (service: LanguagesService) => {
        expect(service).toBeTruthy();
    }));

    // it('should return an array of language objects', inject([LanguagesService, MockBackend],
    //     (service: LanguagesService, mockBackend: MockBackend) => {
    //         const mockResponse = new Response(
    //             new ResponseOptions({
    //                 body: JSON.stringify(MockApiResponse_LanguagesIndex),
    //                 status: 200
    //             })
    //         );
    //
    //         mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));
    //
    //         service.getLanguages().subscribe(res => {
    //             console.log(res);
    //             expect(res).toEqual(MockApiResponse_LanguagesIndex.records);
    //         }, (e) => console.log(e));
    //     }));
});
