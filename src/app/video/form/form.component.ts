import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { VideoService } from '../video.service';
import { Video } from '../../models/video';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
    selector: 'gn-video-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class VideoFormComponent implements OnInit, OnDestroy, OnChanges {
    transcriptionLanguages = GoogleCloudSpeechLanguages;
    languages: any[];
    selectedTranscriptionLanguage: GoogleCloudSpeechLanguage;
    transcriptionEmitted$: Observable<string>;
    categories: any[];
    speakers: any[];

    @Input() video: Video;

    private emitTranscriptSource: Subject<string>;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideoService,
                private langService: LanguagesService,
                private categoryService: CategoriesService,
                private sanitizer: DomSanitizer,
                private speakerService: SpeakerService) {
        this.emitTranscriptSource = new Subject<string>();
        this.transcriptionEmitted$ = this.emitTranscriptSource.asObservable();
        this.selectedTranscriptionLanguage = _.find(this.transcriptionLanguages, {code: 'en-US'});
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['video'].currentValue.category_id) {
            console.log('&&', changes);
        }
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.langService.getLanguages().subscribe((languages: any[]) => this.languages = languages),
            this.categoryService.getCategories().subscribe((categories: any[]) => this.categories = _.sortBy(categories, 'name')),
            this.speakerService.getSpeakers().subscribe(speakers => this.speakers = _.sortBy(speakers, ['name', 'location']))
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSelectTranscriptionLanguage(e: Event): void {
        this.selectedTranscriptionLanguage = _.nth(this.transcriptionLanguages, (<HTMLSelectElement>e.target).selectedIndex);
    }

    onFileChange(e: Event) {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.video.file = _.first(inputElement.files);
        this.video.video_url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.video.file));
    }

    onClickTranscribe(): void {
        const subscription = this.videoService.transcribe(this.video.file, this.selectedTranscriptionLanguage.code)
            .subscribe((t: string) => this.emitTranscriptSource.next(t));

        this.subscriptions.push(subscription);
    }

    nameOfLanguageForId(id: number): string {
        return _.get(_.find(this.languages, {id: id}), 'name', _.stubString());
    }

    onSubmit(): void {
        const metadata = {
            subcategory_id: this.video.subcategory_id,
            language_id: this.video.language_id,
            speaker_id: this.video.speaker_id,
            descriptions: this.video.descriptions,
            transcripts: this.video.transcripts
        };

        this.subscriptions.push(
            this.videoService.createVideo(this.video.file, metadata).subscribe((res: any) => {
                console.log('RES:', res);
            }, (err: any) => {
                console.log('ERR:', err);
            })
        );
    }
}
