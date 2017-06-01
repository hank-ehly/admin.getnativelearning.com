import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CategoriesService } from './categories.service';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

import * as _ from 'lodash';

describe('CategoriesService', () => {
    const mockCategories = {
        records: [{
            id: 123,
            name: 'category 1',
            subcategories: {
                records: [],
                count: 0
            }
        }],
        count: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                CategoriesService,
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

    it('should be created', inject([CategoriesService], (service: CategoriesService) => {
        expect(service).toBeTruthy();
    }));

    it('should return a list of categories', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(mockCategories)
                })
            );

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(mockResponse);
            });

            service.getCategories().subscribe(res => {
                expect(res).toEqual(mockCategories.records);
            });
        }));

    it('should return a single category', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(mockCategories.records))
                })
            );

            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(mockResponse);
            });

            service.getCategory(_.first(mockCategories.records).id).subscribe(res => {
                expect(res).toEqual(_.first(mockCategories.records));
            });
        }));
});
