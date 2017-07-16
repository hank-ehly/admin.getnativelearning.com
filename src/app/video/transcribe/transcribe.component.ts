import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';

import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';
import { VideoService } from '../video.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-transcribe-video',
    templateUrl: './transcribe.component.html',
    styleUrls: ['./transcribe.component.scss']
})
export class TranscribeVideoComponent implements OnDestroy {
    languages = GoogleCloudSpeechLanguages;
    selectedLanguage: GoogleCloudSpeechLanguage;
    transcriptionEmitted$: Observable<string>;
    videoFileObject: File;
    videoPreviewSafeUrl: SafeUrl;
    isRequestInProgress = false;
    private emitTranscription: Subject<string>;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideoService, private sanitizer: DomSanitizer) {
        this.selectedLanguage = _.find(this.languages, {code: 'en-US'});
        this.emitTranscription = new Subject<string>();
        this.transcriptionEmitted$ = this.emitTranscription.asObservable();
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSelectTranscriptionLanguage(e: Event): void {
        this.selectedLanguage = _.nth(this.languages, (<HTMLSelectElement>e.target).selectedIndex);
    }

    onClickTranscribe(): void {
        this.isRequestInProgress = true;
        const subscription = this.videoService.transcribe(this.videoFileObject, this.selectedLanguage.code).subscribe((t: string) => {
            this.emitTranscription.next(t);
        }, null, () => this.isRequestInProgress = false);

        this.subscriptions.push(subscription);
    }

    onFileChange(e: Event): void {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.videoFileObject = _.first(inputElement.files);
        this.videoPreviewSafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.videoFileObject));
    }
}
