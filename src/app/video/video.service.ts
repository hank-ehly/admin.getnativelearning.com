import { RequestMethod, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { CreateVideoRequestBody } from './new/create-video-request-body';
import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Injectable()
export class VideoService {
    constructor(private http: HttpService) {
    }

    transcribe(file: File, languageCode: string): Observable<string> {
        const formData = new FormData();
        formData.append('video', file, file.name);

        const search = new URLSearchParams();
        search.set('language_code', languageCode);

        const options = {
            method: RequestMethod.Post,
            body: formData,
            search: search
        };

        return this.http.request('/videos/transcribe', options).pluck('transcription');
    }

    createVideo(file: File, metadata: CreateVideoRequestBody): Observable<any> {
        const formData = new FormData();
        formData.append('video', file, file.name);
        formData.append('metadata', JSON.stringify(metadata));
        return this.http.request('/videos', {method: RequestMethod.Post, body: formData}).pluck('id');
    }

    getVideo(id: number): Observable<any> {
        return this.http.request(`/videos/${id}`, {method: RequestMethod.Get});
    }

    getVideoLocalizations(id: number): Observable<any[]> {
        return this.http.request(`/videos/${id}/videos_localized`, {method: RequestMethod.Get}).pluck('records');
    }
}
