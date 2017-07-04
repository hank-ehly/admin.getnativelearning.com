import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';

import { MockApiResponse_SubcategoriesCreate } from '../testing/mock-api-responses/subcategories-create';
import { MockApiResponse_CategoriesIndex } from '../testing/mock-api-responses/categories-index';
import { MockApiResponse_CategoriesShow } from '../testing/mock-api-responses/categories-show';
import { MockApiResponse_404 } from '../testing/mock-api-responses/404';
import { CategoriesService } from './categories.service';
import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

import * as _ from 'lodash';

describe('CategoriesService', () => {
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
                CategoriesService, HttpService, AuthService, MockBackend, BaseRequestOptions, {provide: Router, useClass: RouterStub},
                {provide: Http, useFactory: (b, o) => new Http(b, o), deps: [MockBackend, BaseRequestOptions]}
            ]
        });
    });

    it('should be created', inject([CategoriesService], (service: CategoriesService) => {
        return expect(service).toBeTruthy();
    }));

    it('should return a list of categories', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(MockApiResponse_CategoriesIndex),
                    status: 200
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getCategories().subscribe(res => {
                return expect(res).toEqual(MockApiResponse_CategoriesIndex.records);
            });
        }));

    it('should return a single category', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(MockApiResponse_CategoriesIndex.records)),
                    status: 200
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getCategory(_.first(MockApiResponse_CategoriesIndex.records).id).subscribe(res => {
                return expect(res).toEqual(_.first(MockApiResponse_CategoriesIndex.records));
            });
        }));

    it('should return a single subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(_.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records)),
                    status: 200
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.getSubcategory(
                _.first(MockApiResponse_CategoriesIndex.records).id,
                _.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records).id
            ).subscribe(res => {
                return expect(res).toEqual(_.first(_.first(MockApiResponse_CategoriesIndex.records).subcategories.records));
            });
        }));

    it('should return true after successfully updating a category localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null),
                    status: 204
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateCategoryLocalized(
                MockApiResponse_CategoriesShow.id,
                _.first(MockApiResponse_CategoriesShow.categories_localized.records).id,
                {name: 'new name'}
            ).subscribe(res => {
                return expect(res).toEqual(true);
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
                return expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully updating a subcategory localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null),
                    status: 204
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateSubcategoryLocalized(1, 2, {name: 'name'}).subscribe(res => {
                return expect(res).toEqual(true);
            });
        }));

    it('should return false if failed to update subcategory localized record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.updateSubcategoryLocalized(1, 2, {name: 'name'}).subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully updating a subcategory record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null),
                    status: 204
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.updateSubcategory(1, 2, {category_id: 1}).subscribe(res => {
                return expect(res).toEqual(true);
            });
        }));

    it('should return false if failed to update subcategory record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.updateSubcategory(1, 2, {category_id: 1}).subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));

    // it('should return the Category ID after creating a new Category record', inject([CategoriesService, MockBackend],
    //     (service: CategoriesService, mockBackend: MockBackend) => {
    //         const mockResponse = new Response(
    //             new ResponseOptions({
    //                 body: JSON.stringify(MockApiResponse_CategoriesCreate),
    //                 status: 201
    //             })
    //         );
    //
    //         mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));
    //
    //         service.createCategory().subscribe(res => {
    //             return expect(res).toEqual(MockApiResponse_CategoriesCreate.id);
    //         });
    //     }));

    it('should return false if failed to create a Category record', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.createCategory().subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully deleting a Category', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null),
                    status: 204
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.deleteCategory(1).subscribe(res => {
                return expect(res).toEqual(true);
            });
        }));

    it('should return false after failing to delete a Category', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.deleteCategory(1).subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));

    it('should return the categoryId and subcategoryId after successfully creating a Subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(MockApiResponse_SubcategoriesCreate),
                    status: 201
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.createSubcategory(1).subscribe(res => {
                return expect(res).toEqual({
                    subcategoryId: MockApiResponse_SubcategoriesCreate.id,
                    categoryId: MockApiResponse_SubcategoriesCreate.category_id
                });
            });
        }));

    it('should return false after failing to create a Subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.createSubcategory(1).subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));

    it('should return true after successfully deleting a Subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            const mockResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(null),
                    status: 204
                })
            );

            mockBackend.connections.subscribe(c => c.mockRespond(mockResponse));

            service.deleteSubcategory(1, 2).subscribe(res => {
                return expect(res).toEqual(true);
            });
        }));

    it('should return false after failing to delete a Subcategory', inject([CategoriesService, MockBackend],
        (service: CategoriesService, mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(c => c.mockRespond(mockErrorResponse));

            service.deleteSubcategory(1, 2).subscribe(res => {
                return expect(res).toEqual(false);
            });
        }));
});
