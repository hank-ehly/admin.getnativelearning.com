import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CategoriesService } from './categories.service';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

describe('CategoriesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService
            ]
        });
    });

    it('should be created', inject([CategoriesService], (service: CategoriesService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an Observable', inject([CategoriesService], (service: CategoriesService) => {
        expect(service.getCategories().constructor.name).toEqual('Observable');
    }));
});
