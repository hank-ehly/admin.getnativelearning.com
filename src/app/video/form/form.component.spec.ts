import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';
import { GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { newEvent, select } from '../../testing/index';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { VideoFormComponent } from './form.component';
import { VideoService } from '../video.service';
import { Video } from '../../models/video';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import * as _ from 'lodash';

let comp: VideoFormComponent;
let fixture: ComponentFixture<VideoFormComponent>;
let page: Page;

describe('VideoFormComponent', () => {
    const mockSpeakerService = {
        getSpeakers(): Observable<any> {
            return Observable.of(MockApiResponse_SpeakersIndex.records);
        }
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, FormsModule],
            declarations: [VideoFormComponent],
            providers: [VideoService, HttpService, AuthService, LanguagesService, CategoriesService,
                {provide: SpeakerService, useValue: mockSpeakerService}
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    it('contains a file input element', () => {
        return expect(page.fileInput).toBeTruthy();
    });

    it('contains a transcript textarea for each language', () => {
        const compiled = fixture.debugElement.nativeElement;
        return expect(compiled.querySelectorAll('textarea.transcript').length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('contains a description textarea for each language', () => {
        const compiled = fixture.debugElement.nativeElement;
        return expect(compiled.querySelectorAll('textarea.description').length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should have a dropdown with an option whose value is en-US and textContent is English (United States)', () => {
        const compiled = fixture.debugElement.nativeElement;

        const option = _.find(compiled.querySelector('select.video__transcription-language').options,
            {value: 'en-US'}) as HTMLOptionElement;

        return expect(option.textContent).toEqual('English (United States)');
    });

    it('should have a list of transcription transcriptionLanguages', () => {
        return expect(comp.transcriptionLanguages.length).toBeGreaterThan(0);
    });

    it('should change the selected option in the language dropdown when the selected language model changes', () => {
        comp.selectedTranscriptionLanguage = _.find(GoogleCloudSpeechLanguages, {
            code: 'af-ZA'
        });

        const option = _.find(fixture.debugElement.query(By.css('select.video__transcription-language')).nativeElement.options,
            {value: 'af-ZA'}) as HTMLOptionElement;
        fixture.detectChanges();

        return expect(option.selected).toBeTruthy();
    });

    it('should change the selected language model when an option is selected in the language dropdown', async () => {
        const select: HTMLSelectElement = fixture.debugElement.query(By.css('select.video__transcription-language')).nativeElement;
        select.selectedIndex = _.findIndex(GoogleCloudSpeechLanguages, {code: 'af-ZA'});
        select.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        return expect(comp.selectedTranscriptionLanguage.code).toEqual('af-ZA');
    });

    it('should disable the transcribe button by default', () => {
        return expect(page.transcribeButton.disabled).toBeTruthy();
    });

    it('should enable the transcribe button after the video.file is populated', () => {
        comp.video.file = new File([], 'file');
        fixture.detectChanges();
        return expect(page.transcribeButton.disabled).toBeFalsy();
    });

    it('should retrieve a list of languages', () => {
        return expect(comp.languages.length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should list all possible video transcriptionLanguages', () => {
        const numberOfLanguages = 2;
        return expect(page.videoLanguageSelect.options.length).toEqual(numberOfLanguages);
    });

    it('should retrieve a list of categories', () => {
        return expect(comp.categories.length).toEqual(MockApiResponse_CategoriesIndex.records.length);
    });

    it('should display a disabled subcategories dropdown by default', () => {
        return expect(page.subcategoriesSelect.disabled).toEqual(true);
    });

    it('should set comp.selectedCategory after selecting a Category from the category dropdown', () => {
        select(page.categoriesSelect, 0, fixture);
        return expect(comp.selectedCategory).not.toBeNull();
    });

    it('should set the video.subcategoryId to null after selecting a new category', () => {
        select(page.categoriesSelect, 0, fixture);
        select(page.subcategoriesSelect, 0, fixture);
        select(page.categoriesSelect, 2, fixture);
        return expect(comp.video.subcategory_id).toBeNull();
    });

    it('should update the appropriate transcription model after entering text into the textarea', () => {
        const languageId = _.find(comp.languages, {code: 'en'}).id;
        const englishTranscriptTextarea = _.find(page.transcriptTextareaEls, {id: `transcript[${languageId}]`});
        const englishTranscriptModelIndex = _.findIndex(comp.video.transcripts, {languageId: languageId});
        const testValue = 'New Value';
        englishTranscriptTextarea.value = testValue;
        englishTranscriptTextarea.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        return expect(comp.video.transcripts[englishTranscriptModelIndex].text).toEqual(testValue);
    });

    it('should update the appropriate video description model after entering text into a description textarea', () => {
        const languageId = _.find(comp.languages, {code: 'en'}).id;
        const englishTextarea = _.find(page.descriptionTextareaEls, {id: `description[${languageId}]`});
        const english = _.findIndex(comp.video.descriptions, {languageId: languageId});
        const testValue = 'New Value';
        englishTextarea.value = testValue;
        englishTextarea.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        return expect(comp.video.descriptions[english].description).toEqual(testValue);
    });

    it('should initialize the transcripts in the component', () => {
        return expect(comp.video.transcripts.length).toEqual(comp.languages.length);
    });

    it('should display a list of speakers', () => {
        return expect(page.speakerSelect.options.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should update the model speakerId after selecting a speaker', () => {
        select(page.speakerSelect, 1, fixture);
        return expect(+comp.video.speaker_id).toEqual(MockApiResponse_SpeakersIndex.records[1].id);
    });

    it('should enable the submit button after filling out the required information', () => {
        select(page.videoLanguageSelect, 0, fixture);
        select(page.categoriesSelect, 0, fixture);
        select(page.subcategoriesSelect, 0, fixture);
        select(page.speakerSelect, 0, fixture);
        for (let i = 0; i < page.transcriptTextareaEls.length; i++) {
            page.transcriptTextareaEls[i].value = 'Test transcript';
            page.transcriptTextareaEls[i].dispatchEvent(newEvent('input'));
        }
        for (let i = 0; i < page.descriptionTextareaEls.length; i++) {
            page.descriptionTextareaEls[i].value = 'Test description';
            page.descriptionTextareaEls[i].dispatchEvent(newEvent('input'));
        }
        fixture.detectChanges();
        return expect(page.submitButton.disabled).toEqual(false);
    });
});

function initMockVideo(): Video {
    const video = {
        subcategory_id: null,
        file: null,
        speaker_id: null,
        language_id: null,
        transcripts: [],
        descriptions: []
    };
    for (const language of MockApiResponse_LanguagesIndex.records) {
        video.transcripts.push({language_id: language.id, text: _.stubString()});
        video.descriptions.push({language_id: language.id, description: _.stubString()});
    }
    return video;
}

function createComponent() {
    fixture = TestBed.createComponent(VideoFormComponent);
    comp = fixture.componentInstance;

    comp.video = initMockVideo();

    spyOn(fixture.debugElement.injector.get(LanguagesService), 'getLanguages').and
        .returnValue(Observable.of(MockApiResponse_LanguagesIndex.records));

    spyOn(fixture.debugElement.injector.get(CategoriesService), 'getCategories').and
        .returnValue(Observable.of(MockApiResponse_CategoriesIndex.records));

    fixture.detectChanges();

    page = new Page();
    page.refreshPageElements();

    return fixture.whenStable();
}

class Page {
    fileInput: HTMLInputElement;
    transcribeButton: HTMLButtonElement;
    videoLanguageSelect: HTMLSelectElement;
    categoriesSelect: HTMLSelectElement;
    subcategoriesSelect: HTMLSelectElement;
    speakerSelect: HTMLSelectElement;
    indexCategoriesResponse: any;
    transcriptTextareaEls: HTMLTextAreaElement[];
    descriptionTextareaEls: HTMLTextAreaElement[];
    submitButton: HTMLButtonElement;

    constructor() {
        this.indexCategoriesResponse = _.cloneDeep(MockApiResponse_CategoriesIndex);
    }

    refreshPageElements(): void {
        this.fileInput = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
        this.transcribeButton = fixture.debugElement.query(By.css('button')).nativeElement;
        this.videoLanguageSelect = fixture.debugElement.query(By.css('select.video__language')).nativeElement;
        this.categoriesSelect = fixture.debugElement.query(By.css('select.video__category')).nativeElement;
        this.subcategoriesSelect = fixture.debugElement.query(By.css('select.video__subcategory')).nativeElement;
        this.speakerSelect = fixture.debugElement.query(By.css('select.video__speaker')).nativeElement;
        this.transcriptTextareaEls = fixture.debugElement.queryAll(By.css('textarea.transcript')).map(el => el.nativeElement);
        this.descriptionTextareaEls = fixture.debugElement.queryAll(By.css('textarea.description')).map(el => el.nativeElement);
        this.submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    }
}
