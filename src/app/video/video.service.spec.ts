import { BaseRequestOptions, Http, HttpModule, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';

import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';
import { VideoService } from './video.service';


describe('VideoService', () => {
    const file = new File([], '');
    const lang = 'en-US';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                VideoService, HttpService, AuthService, {provide: Router, useClass: RouterStub}, MockBackend, BaseRequestOptions,
                {provide: Http, useFactory: (b, o) => new Http(b, o), deps: [MockBackend, BaseRequestOptions]}]
        });
    });

    describe('transcribe', () => {
        it('should be created', inject([VideoService], (service: VideoService) => {
            return expect(service).toBeTruthy();
        }));

        it('should take a first argument of File type', inject([VideoService], (service: VideoService) => {
            return expect(() => service.transcribe(file, lang)).not.toThrow();
        }));

        it('should take an optional second language code argument of string type', inject([VideoService], (service: VideoService) => {
            return expect(() => service.transcribe(file, lang)).not.toThrow();
        }));
    });
});
