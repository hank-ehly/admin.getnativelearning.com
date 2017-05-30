import { Component, OnDestroy, OnInit } from '@angular/core';

import { VideosService } from './videos.service';
import { GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {
    title = 'Videos';
    languages = GoogleCloudSpeechLanguages;

    emitTranscriptSource = new Subject<string>();
    transcriptionEmitted$ = this.emitTranscriptSource.asObservable();

    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideosService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onFileChange(e: Event) {
        const fileObject = _.first((<HTMLInputElement>e.target).files);

        const transcribeSubscription = this.videoService.transcribe(fileObject).subscribe((transcription: string) => {
            this.emitTranscriptSource.next(transcription);
        });

        this.subscriptions.push(transcribeSubscription);
    }
}
