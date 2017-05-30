import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class VideosService {
    constructor(private http: HttpService) {
    }

    transcribe(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        const options = {
            method: RequestMethod.Post,
            body: formData
        };

        return this.http.request('/videos/transcribe', options).pluck('transcription');
    }
}
