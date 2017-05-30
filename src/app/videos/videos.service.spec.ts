import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { VideosService } from './videos.service';
import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';

describe('VideosService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [VideosService, HttpService, AuthService]
        });
    });

    it('should be created', inject([VideosService], (service: VideosService) => {
        expect(service).toBeTruthy();
    }));

    it('should take a single argument of File type', inject([VideosService], (service: VideosService) => {
        const file = new File([], '');
        expect(() => service.transcribe(file)).not.toThrow();
    }));

    it('should not return null', inject([VideosService], (service: VideosService) => {
        const file = new File([], '');
        expect(typeof service.transcribe(file)).not.toBeNull();
    }));

    it('should return an Observable', inject([VideosService], (service: VideosService) => {
        const file = new File([], '');
        expect(service.transcribe(file).constructor.name).toEqual('Observable');
    }));
});
