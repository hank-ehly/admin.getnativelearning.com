import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';

import { MockApiResponse_CategoriesIndex } from '../testing/mock-api-responses/categories-index';
import { MockApiResponse_CategoriesShow } from '../testing/mock-api-responses/categories-show';
import { MockApiResponse_404 } from '../testing/mock-api-responses/404';
import { CategoriesService } from './categories.service';
import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

import * as _ from 'lodash';
import { MockApiResponse_CategoriesCreate } from '../testing/mock-api-responses/categories-create';

describe('CategoriesService', () => {
    const mockErrorResponse = new Response(
        new ResponseOptions({
            status: 404,
            body: MockApiResponse_404
        })
    );

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
                },
                {
                    provide: Router,
                    useClass: RouterStub
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
                    body: JSON.stringify(MockApiResponse_CategoriesIndex)
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getCategories().subscribe(res => {
                expect(res).toEqual(MockApiResponse_CategoriesIndex.records);
            });
        }));

    it('should return a single category', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(MockApiResponse_CategoriesIndex.records))
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getCategory(_.first(MockApiResponse_CategoriesIndex.records).id).subscribe(res => {
                expect(res).toEqual(_.first(MockApiResponse_CategoriesIndex.records));
            });
        }));

    it('should return a single subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records))
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getSubcategory(
                _.first(MockApiResponse_CategoriesIndex.records).id,
                _.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records).id
            ).subscribe(res => {
                expect(res).toEqual(_.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records));
            });
        }));

    it('should return true after successfully updating a category localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null)
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateCategoryLocalized(
                MockApiResponse_CategoriesShow.id,
                _.first(MockApiResponse_CategoriesShow.categories_localized.records).id,
                {name: 'new name'}
            ).subscribe(res => {
                expect(res).toEqual(true);
            });
        }));

    it('should return false if failed to update category localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.updateCategoryLocalized(
                MockApiResponse_CategoriesShow.id,
                _.first(MockApiResponse_CategoriesShow.categories_localized.records).id,
                {name: 'new name'}
            ).subscribe(res => {
                expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully updating a subcategory localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null)
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateSubcategoryLocalized(1, 2, {name: 'name'}).subscribe(res => {
                expect(res).toEqual(true);
            });
        }));

    it('should return false if failed to update subcategory localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.updateSubcategoryLocalized(1, 2, {name: 'name'}).subscribe(res => {
                expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully updating a subcategory record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null)
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateSubcategory(1, 2, {category_id: 1}).subscribe(res => {
                expect(res).toEqual(true);
            });
        }));

    it('should return false if failed to update subcategory record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.updateSubcategory(1, 2, {category_id: 1}).subscribe(res => {
                expect(res).toEqual(false);
            });
        }));

    it('should return the Category ID after creating a new Category record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(MockApiResponse_CategoriesCreate)
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.createCategory().subscribe(res => {
                expect(res).toEqual(MockApiResponse_CategoriesCreate.id);
            });
        }));

    it('should return false if failed to create a Category record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.createCategory().subscribe(res => {
                expect(res).toEqual(false);
            });
        }));
});
