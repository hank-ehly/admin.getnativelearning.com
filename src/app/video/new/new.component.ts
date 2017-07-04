import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { VideoService } from '../video.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

interface Transcript {
    text: string;
    languageId: number;
}

interface Video {
    subcategoryId: number;
    file: File;
    speakerId: number;
    languageId: number;
    transcripts: Transcript[];
}

@Component({
    selector: 'gn-new-video',
    templateUrl: './new.component.html'
})
export class NewVideoComponent implements OnInit, OnDestroy {
    transcriptionLanguages = GoogleCloudSpeechLanguages;
    languages: any[];
    selectedTranscriptionLanguage: GoogleCloudSpeechLanguage;
    previewFileUrl: SafeUrl;
    transcriptionEmitted$: Observable<string>;
    categories: any[];
    selectedCategory: any = null;

    video: Video = {
        subcategoryId: null,
        file: null,
        speakerId: null,
        languageId: null,
        transcripts: []
    };

    private emitTranscriptSource: Subject<string>;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideoService,
                private langService: LanguagesService,
                private categoryService: CategoriesService,
                private sanitizer: DomSanitizer) {
        this.emitTranscriptSource = new Subject<string>();
        this.transcriptionEmitted$ = this.emitTranscriptSource.asObservable();
        this.selectedTranscriptionLanguage = _.find(this.transcriptionLanguages, {code: 'en-US'});
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.langService.getLanguages().subscribe((languages: any[]) => {
                this.languages = languages;
                _.each(languages, l => this.video.transcripts.push({languageId: l.id, text: ''}));
            }),
            this.categoryService.getCategories().subscribe((categories: any[]) => this.categories = categories)
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSelectTranscriptionLanguage(e: Event): void {
        this.selectedTranscriptionLanguage = _.nth(this.transcriptionLanguages, (<HTMLSelectElement>e.target).selectedIndex);
    }

    onFileChange(e: Event) {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.video.file = _.first(inputElement.files);
        this.previewFileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.video.file));
    }

    onClickTranscribe(): void {
        const subscription = this.videoService.transcribe(this.video.file, this.selectedTranscriptionLanguage.code)
            .subscribe((t: string) => this.emitTranscriptSource.next(t));

        this.subscriptions.push(subscription);
    }

    onSelectCategory(e: Event): void {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selectedCategory = _.find(this.categories, {id: +selectedOption.value});
        this.video.subcategoryId = null;
    }

    nameOfLanguageForId(id: number) {
        return _.find(this.languages, {id: id}).name;
    }

    transcriptForLanguageChanged(languageId: number, text: string): void {
        _.find(this.video.transcripts, {languageId: languageId}).text = text;
    }
}
