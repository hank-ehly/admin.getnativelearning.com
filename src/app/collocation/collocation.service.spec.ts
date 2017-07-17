import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CollocationService } from './collocation.service';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';

describe('CollocationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [CollocationService, HttpService, AuthService]
        });
    });

    it('should be created', inject([CollocationService], (service: CollocationService) => {
        expect(service).toBeTruthy();
    }));
});
