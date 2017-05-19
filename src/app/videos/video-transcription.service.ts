import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoTranscriptionService {

    transcribeVideoFile(file: File): Observable<string> {
        return new Observable<string>();
    }

}
