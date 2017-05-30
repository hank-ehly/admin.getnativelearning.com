import { Component, OnDestroy } from '@angular/core';

import { VideosService } from './videos.service';
import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnDestroy {
    title = 'Videos';
    languages = GoogleCloudSpeechLanguages;
    selectedLanguage: GoogleCloudSpeechLanguage;

    emitTranscriptSource = new Subject<string>();
    transcriptionEmitted$ = this.emitTranscriptSource.asObservable();

    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideosService) {
        this.selectedLanguage = _.find(this.languages, {code: 'en-US'});
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSelectLanguage(e: Event): void {
        const selectedIndex = (<HTMLSelectElement>e.target).selectedIndex;
        this.selectedLanguage = _.nth(this.languages, selectedIndex);
    }

    onFileChange(e: Event) {
        const fileObject = _.first((<HTMLInputElement>e.target).files);

        console.log(this.selectedLanguage);

        const transcribeSubscription = this.videoService.transcribe(fileObject, this.selectedLanguage.code)
            .subscribe((transcription: string) => {
                this.emitTranscriptSource.next(transcription);
            });

        this.subscriptions.push(transcribeSubscription);
    }
}
