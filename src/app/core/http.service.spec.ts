import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [HttpService]
        });
    });

    it('should ...', inject([HttpService], (service: HttpService) => {
        expect(service).toBeTruthy();
    }));
});
