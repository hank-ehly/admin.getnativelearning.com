import { Component, OnDestroy } from '@angular/core';
import { VideosService } from '../videos.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import * as _ from 'lodash';

@Component({
    selector: 'gn-new-video',
    templateUrl: './new-video.component.html',
    styleUrls: ['./new-video.component.scss']
})
export class NewVideoComponent implements OnDestroy {
    languages = GoogleCloudSpeechLanguages;
    selectedLanguage: GoogleCloudSpeechLanguage;
    selectedVideoFile: File = null;
    transcriptionEmitted$: Observable<string>;

    private emitTranscriptSource: Subject<string>;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideosService) {
        this.emitTranscriptSource = new Subject<string>();
        this.transcriptionEmitted$ = this.emitTranscriptSource.asObservable();
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
        this.selectedVideoFile = _.first((<HTMLInputElement>e.target).files);
    }

    onClickTranscribe(): void {
        const subscription = this.videoService.transcribe(this.selectedVideoFile, this.selectedLanguage.code).subscribe((t: string) => {
            this.emitTranscriptSource.next(t);
        });

        this.subscriptions.push(subscription);
    }
}
