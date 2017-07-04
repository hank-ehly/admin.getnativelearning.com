import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';
import { VideoService } from './video.service';

import { Observable } from 'rxjs/Observable';

describe('VideoService', () => {
    const file = new File([], '');
    const lang = 'en-US';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [VideoService, HttpService, AuthService, {provide: Router, useClass: RouterStub}]
        });
    });

    it('should be created', inject([VideoService], (service: VideoService) => {
        return expect(service).toBeTruthy();
    }));

    it('should take a first argument of File type', inject([VideoService], (service: VideoService) => {
        return expect(() => service.transcribe(file, lang)).not.toThrow();
    }));

    it('should take an optional second language code argument of string type', inject([VideoService], (service: VideoService) => {
        return expect(() => service.transcribe(file, lang)).not.toThrow();
    }));

    it('should not return null', inject([VideoService], (service: VideoService) => {
        return expect(typeof service.transcribe(file, lang)).not.toBeNull();
    }));

    it('should return an Observable', inject([VideoService], (service: VideoService) => {
        return expect(service.transcribe(file, lang).constructor.name).toEqual('Observable');
    }));
});
