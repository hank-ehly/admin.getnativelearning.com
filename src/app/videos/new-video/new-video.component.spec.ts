import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { GoogleCloudSpeechLanguages } from '../google-cloud-speech-languages';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { NewVideoComponent } from './new-video.component';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { VideosService } from '../videos.service';
import { select } from '../../testing/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import * as _ from 'lodash';

let comp: NewVideoComponent;
let fixture: ComponentFixture<NewVideoComponent>;
let page: Page;

describe('NewVideoComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                NewVideoComponent
            ],
            providers: [
                VideosService,
                HttpService,
                AuthService,
                LanguagesService,
                CategoriesService
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        expect(comp).toBeTruthy();
    });

    it('contains a file input element', () => {
        expect(page.fileInput).toBeTruthy();
    });

    it('contains an empty textarea', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('textarea').length).toEqual(1);
    });

    it('should have a dropdown with an option whose value is en-US and textContent is English (United States)', () => {
        const compiled = fixture.debugElement.nativeElement;

        const option = _.find(compiled.querySelector('select').options, {value: 'en-US'}) as HTMLOptionElement;

        expect(option).toBeTruthy();
        expect(option.textContent).toEqual('English (United States)');
    });

    it('should have a list of transcription transcriptionLanguages', () => {
        expect(comp.transcriptionLanguages.length).toBeGreaterThan(0);
    });

    it('should change the selected option in the language dropdown when the selected language model changes', () => {
        comp.selectedTranscriptionLanguage = _.find(GoogleCloudSpeechLanguages, {
            code: 'af-ZA'
        });

        const option = _.find(fixture.debugElement.query(By.css('select.video__transcription-language')).nativeElement.options,
            {value: 'af-ZA'}) as HTMLOptionElement;
        fixture.detectChanges();

        expect(option.selected).toBeTruthy();
    });

    it('should change the selected language model when an option is selected in the language dropdown', async () => {
        const select: HTMLSelectElement = fixture.debugElement.query(By.css('select.video__transcription-language')).nativeElement;
        select.selectedIndex = _.findIndex(GoogleCloudSpeechLanguages, {code: 'af-ZA'});
        select.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(comp.selectedTranscriptionLanguage.code).toEqual('af-ZA');
    });

    it('should disable the transcribe button by default', () => {
        expect(page.transcribeButton.disabled).toBeTruthy();
    });

    it('should enable the transcribe button after the selectedVideoFile is populated', () => {
        comp.selectedVideoFile = new File([], 'file');
        fixture.detectChanges();
        expect(page.transcribeButton.disabled).toBeFalsy();
    });

    it('should retrieve a list of languages', () => {
        expect(comp.languages.length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should list all possible video transcriptionLanguages', () => {
        const numberOfLanguages = 2;
        expect(page.videoLanguageSelect.options.length).toEqual(numberOfLanguages);
    });

    it('should retrieve a list of categories', () => {
        expect(comp.categories.length).toEqual(MockApiResponse_CategoriesIndex.records.length);
    });

    it('should display a disabled subcategories dropdown by default', () => {
        expect(page.subcategoriesSelect.disabled).toEqual(true);
    });

    it('should set comp.selectedCategory after selecting a Category from the category dropdown', () => {
        select(page.categoriesSelect, 1, fixture);
        expect(comp.selectedCategory).not.toBeNull();
    });

    it('should set comp.selectedSubcategory after selecting a Subcategory from the subcategoryDropdown', () => {
        select(page.categoriesSelect, 1, fixture);
        select(page.subcategoriesSelect, 0, fixture);
        // The first category option is "-"
        const expectedSubcategory = _.first(_.nth(page.indexCategoriesResponse.records, 0)['subcategories'].records);
        expect(comp.selectedSubcategory).toEqual(expectedSubcategory);
    });

    it('should set the selectedSubcategory to null after selecting a new category', () => {
        select(page.categoriesSelect, 1, fixture);
        select(page.subcategoriesSelect, 0, fixture);
        select(page.categoriesSelect, 2, fixture);
        expect(comp.selectedSubcategory).toBeNull();
    });

    it('should enable the subcategory dropdown after selecting a category', () => {
        select(page.categoriesSelect, 1, fixture);
        expect(page.subcategoriesSelect.disabled).toEqual(false);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(NewVideoComponent);
    comp = fixture.componentInstance;

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
    indexCategoriesResponse: any;

    constructor() {
        this.indexCategoriesResponse = _.cloneDeep(MockApiResponse_CategoriesIndex);
    }

    refreshPageElements(): void {
        this.fileInput = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
        this.transcribeButton = fixture.debugElement.query(By.css('button')).nativeElement;
        this.videoLanguageSelect = fixture.debugElement.query(By.css('select.video__language')).nativeElement;
        this.categoriesSelect = fixture.debugElement.query(By.css('select.video__category')).nativeElement;
        this.subcategoriesSelect = fixture.debugElement.query(By.css('select.video__subcategory')).nativeElement;
    }
}
