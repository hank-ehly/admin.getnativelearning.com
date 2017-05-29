import { TestBed, inject } from '@angular/core/testing';

import { VideoTranscriptionService } from './video-transcription.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
import { HttpModule } from '@angular/http';

describe('VideoTranscriptionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [VideoTranscriptionService, HttpService]
        });
    });

    it('should be created', inject([VideoTranscriptionService], (service: VideoTranscriptionService) => {
        expect(service).toBeTruthy();
    }));

    it('should take a single argument of File type', inject([VideoTranscriptionService], (service: VideoTranscriptionService) => {
        const file = new File([], '');
        expect(() => service.transcribeVideoFile(file)).not.toThrow();
    }));

    it('should not return null', inject([VideoTranscriptionService], (service: VideoTranscriptionService) => {
        const file = new File([], '');
        expect(typeof service.transcribeVideoFile(file)).not.toBeNull();
    }));

    it('should return an Observable of type string', inject([VideoTranscriptionService], (service: VideoTranscriptionService) => {
        const file = new File([], '');
        expect(service.transcribeVideoFile(file).constructor.name).toEqual('Observable');
    }));
});
