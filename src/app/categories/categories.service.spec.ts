import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';

import { CategoriesService } from './categories.service';
import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

import * as _ from 'lodash';

describe('CategoriesService', () => {
    const mockCategories = {
        records: [{
            id: 123,
            name: 'category 1',
            subcategories: {
                records: [
                    {
                        id: 456,
                        name: 'subcategory 1',
                        created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                        updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
                    }
                ],
                count: 1
            }
        }],
        count: 1
    };

    const mockCategory = {
        id: 123,
        categories_localized: {
            records: [
                {
                    language: {
                        name: 'English',
                        code: 'en'
                    },
                    name: 'Category 1'
                },
                {
                    language: {
                        name: '日本語',
                        code: 'ja'
                    },
                    name: 'カテゴリー１'
                }
            ],
            count: 2
        },
        created_at: 'Wed Jan 11 04:35:55 +0000 2017',
        updated_at: 'Wed Jan 11 04:35:55 +0000 2017',
        subcategories: {
            records: [
                {
                    id: 456,
                    name: 'Subcategory 1',
                    created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                    updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
                }
            ],
            count: 1
        }
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
                },
                {provide: Router, useClass: RouterStub}
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

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

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

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getCategory(_.first(mockCategories.records).id).subscribe(res => {
                expect(res).toEqual(_.first(mockCategories.records));
            });
        }));

    it('should return a single subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(_.first(mockCategories.records).subcategories.records))
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getSubcategory(_.first(mockCategories.records).id, _.first(_.first(mockCategories.records).subcategories.records).id)
                .subscribe(res => {
                    expect(res).toEqual(_.first(_.first(mockCategories.records).subcategories.records));
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

            service.updateCategoryLocalized(mockCategory.id, _.first(mockCategory.categories_localized.records).id, {name: 'new name'})
                .subscribe(res => {
                    expect(res).toEqual(true);
                });
        }));

    it('should return false if failed to update category localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    status: 404,
                    body: [
                        {
                            message: 'No resource was found for the given conditions',
                            code: 'ResourceNotFound'
                        }
                    ]
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateCategoryLocalized(mockCategory.id, _.first(mockCategory.categories_localized.records).id, {name: 'new name'})
                .subscribe(res => {
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
            const mockResponse = new Response(
                new ResponseOptions({
                    status: 404,
                    body: [
                        {
                            message: 'No resource was found for the given conditions',
                            code: 'ResourceNotFound'
                        }
                    ]
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

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
            const mockResponse = new Response(
                new ResponseOptions({
                    status: 404,
                    body: [
                        {
                            message: 'No resource was found for the given conditions',
                            code: 'ResourceNotFound'
                        }
                    ]
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateSubcategory(1, 2, {category_id: 1}).subscribe(res => {
                expect(res).toEqual(false);
            });
        }));
});
