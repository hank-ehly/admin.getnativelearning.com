import { TestBed, inject } from '@angular/core/testing';

import { VideoTranscriptionService } from './video-transcription.service';

describe('VideoTranscriptionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VideoTranscriptionService]
        });
    });

    it('should be created', inject([VideoTranscriptionService], (service: VideoTranscriptionService) => {
        expect(service).toBeTruthy();
    }));
});
