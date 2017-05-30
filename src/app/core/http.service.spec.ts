import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [HttpService, AuthService]
        });
    });

    it('should ...', inject([HttpService], (service: HttpService) => {
        expect(service).toBeTruthy();
    }));

    it('should take url and request options arguments', inject([HttpService], (service: HttpService) => {
        expect(() => service.request('/test', {})).not.toThrow();
    }));

    it('should return an Observable', inject([HttpService], (service: HttpService) => {
        expect(service.request('/test', {}).constructor.name).toEqual('Observable');
    }));
});
