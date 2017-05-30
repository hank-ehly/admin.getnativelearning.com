import { RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class VideosService {
    constructor(private http: HttpService) {
    }

    transcribe(file: File, languageCode: string): Observable<string> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        const search = new URLSearchParams();
        search.set('language_code', languageCode);

        const options = {
            method: RequestMethod.Post,
            body: formData,
            search: search
        };

        return this.http.request('/videos/transcribe', options).pluck('transcription');
    }
}
