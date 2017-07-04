import { BaseRequestOptions, Http, HttpModule, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { MockApiResponse_404 } from '../testing/mock-api-responses/404';
import { SpeakerService } from './speaker.service';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

describe('SpeakerService', () => {
    const mockErrorResponse = new Response(
        new ResponseOptions({
            status: 404,
            body: MockApiResponse_404
        })
    );

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SpeakerService, HttpService, AuthService, MockBackend, BaseRequestOptions,
                {provide: Http, useFactory: (b, o) => new Http(b, o), deps: [MockBackend, BaseRequestOptions]}
            ]
        });
    });

    it('should be created', inject([SpeakerService], (service: SpeakerService) => {
        return expect(service).toBeTruthy();
    }));

    // Uncaught (in promise) SyntaxError: Unexpected token o in JSON at position 1
    // describe('getGenders', () => {
    //     it('should return an array of gender objects if the response is successful', inject([SpeakerService, MockBackend],
    //         (service: SpeakerService, mockBackend: MockBackend) => {
    //             const mockResponse = new Response(
    //                 new ResponseOptions({
    //                     body: JSON.stringify(MockApiResponse_GendersIndex),
    //                     status: 200
    //                 })
    //             );
    //
    //             mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));
    //
    //             service.getGenders().subscribe(res => {
    //                 return expect(res).toEqual(MockApiResponse_GendersIndex.records);
    //             });
    //         }));
    //
    //     it('should return an error response if the gender request fails', inject([SpeakerService, MockBackend],
    //         (service: SpeakerService, mockBackend: MockBackend) => {
    //             mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));
    //
    //             service.getGenders().subscribe(res => {
    //                 return expect(_.first(res)['code']).toBeDefined();
    //             });
    //         }));
    // });

    // Uncaught (in promise) SyntaxError: Unexpected token o in JSON at position 1
    // describe('getSpeakerLocalizations', () => {
    //     it('should return an array of SpeakerLocalized objects', inject([SpeakerService, MockBackend],
    //         (service: SpeakerService, mockBackend: MockBackend) => {
    //             const mockResponse = new Response(
    //                 new ResponseOptions({
    //                     body: JSON.stringify(MockApiResponse_GendersIndex),
    //                     status: 200
    //                 })
    //             );
    //
    //             mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));
    //
    //             service.getSpeakerLocalizations(1).subscribe(res => {
    //                 return expect(res[1]['id']).toEqual(MockApiResponse_SpeakersLocalizedIndex.records[1]['id']);
    //             });
    //         }));
    //
    //     it('should return an error response if the gender request fails', inject([SpeakerService, MockBackend],
    //         (service: SpeakerService, mockBackend: MockBackend) => {
    //             mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));
    //
    //             service.getSpeakerLocalizations(1).subscribe(res => {
    //                 return expect(_.first(res)['code']).toBeDefined();
    //             });
    //         }));
    // });
});
