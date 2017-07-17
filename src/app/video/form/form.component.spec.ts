import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { newEvent, select } from '../../testing/index';
import { RouterStub } from '../../testing/router-stub';
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
                {provide: SpeakerService, useValue: mockSpeakerService}, {provide: Router, useClass: RouterStub}]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    it('should retrieve a list of categories', () => {
        return expect(comp.categories.length).toEqual(MockApiResponse_CategoriesIndex.records.length);
    });

    it('contains a transcript textarea for each language', () => {
        const compiled = fixture.debugElement.nativeElement;
        return expect(compiled.querySelectorAll('textarea.transcript').length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should retrieve a list of languages', () => {
        return expect(comp.languages.length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('contains a description textarea for each language', () => {
        const compiled = fixture.debugElement.nativeElement;
        return expect(compiled.querySelectorAll('textarea.description').length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should update the appropriate video description model after entering text into a description textarea', () => {
        const languageId = _.find(comp.languages, {code: 'en'}).id;
        const englishTextarea = _.find(page.descriptionTextareaEls, {id: `description[${languageId}]`});
        const english = _.findIndex(comp.video.localizations, {language_id: languageId});
        const testValue = 'New Value';
        englishTextarea.value = testValue;
        englishTextarea.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        return expect(comp.video.localizations[english].description).toEqual(testValue);
    });

    it('should initialize the localizations in the component', () => {
        return expect(comp.video.localizations.length).toEqual(comp.languages.length);
    });

    it('should display a list of speakers', () => {
        const numDummyOptions = 1;
        return expect(page.speakerSelect.options.length).toEqual(MockApiResponse_SpeakersIndex.count + numDummyOptions);
    });

    it('should update the model speakerId after selecting a speaker', () => {
        const selectIndex = 0;
        const numDummyOptions = 1;
        select(page.speakerSelect, selectIndex + numDummyOptions, fixture);
        return expect(+comp.video.speaker_id).toEqual(MockApiResponse_SpeakersIndex.records[selectIndex].id);
    });
});

function initMockVideo(): Video {
    const video = {
        subcategory_id: null,
        file: null,
        speaker_id: null,
        language_id: null,
        localizations: []
    };
    for (const language of MockApiResponse_LanguagesIndex.records) {
        video.localizations.push({language_id: language.id, transcript: _.stubString(), description: _.stubString()});
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
        this.subcategoriesSelect = fixture.debugElement.query(By.css('select.video__subcategory')).nativeElement;
        this.speakerSelect = fixture.debugElement.query(By.css('select.video__speaker')).nativeElement;
        this.transcriptTextareaEls = fixture.debugElement.queryAll(By.css('textarea.transcript')).map(el => el.nativeElement);
        this.descriptionTextareaEls = fixture.debugElement.queryAll(By.css('textarea.description')).map(el => el.nativeElement);
        this.submitButton = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    }
}
