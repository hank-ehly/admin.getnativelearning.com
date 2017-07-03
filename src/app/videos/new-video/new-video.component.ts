import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

import { GoogleCloudSpeechLanguage, GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { VideosService } from '../videos.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { sanitizeSrcset } from '@angular/platform-browser/src/security/url_sanitizer';

@Component({
    selector: 'gn-new-video',
    templateUrl: './new-video.component.html',
    styleUrls: ['./new-video.component.scss']
})
export class NewVideoComponent implements OnInit, OnDestroy {
    transcriptionLanguages = GoogleCloudSpeechLanguages;
    languages: any[];
    selectedTranscriptionLanguage: GoogleCloudSpeechLanguage;
    selectedVideoFile: File = null;
    transcriptionEmitted$: Observable<string>;
    categories: any[];
    selectedCategory: any = null;
    selectedSubcategory: any = null;
    previewFileUrl: SafeUrl;

    private emitTranscriptSource: Subject<string>;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideosService,
                private langService: LanguagesService,
                private categoryService: CategoriesService,
                private sanitizer: DomSanitizer) {
        this.emitTranscriptSource = new Subject<string>();
        this.transcriptionEmitted$ = this.emitTranscriptSource.asObservable();
        this.selectedTranscriptionLanguage = _.find(this.transcriptionLanguages, {code: 'en-US'});
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.langService.getLanguages().subscribe((languages: any[]) => this.languages = languages),
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
        this.selectedVideoFile = _.first(inputElement.files);
        this.previewFileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedVideoFile));
    }

    onClickTranscribe(): void {
        const subscription = this.videoService.transcribe(this.selectedVideoFile, this.selectedTranscriptionLanguage.code)
            .subscribe((t: string) => this.emitTranscriptSource.next(t));

        this.subscriptions.push(subscription);
    }

    onSelectCategory(e: Event): void {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selectedCategory = _.find(this.categories, {id: +selectedOption.value});
        this.selectedSubcategory = null;
    }

    onSelectSubcategory(e: Event): void {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>target.options[target.selectedIndex];
        this.selectedSubcategory = _.find(this.selectedCategory.subcategories.records, {id: +selectedOption.value});
    }
}
