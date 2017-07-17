import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';
import { TranscribeVideoComponent } from './transcribe.component';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { VideoService } from '../video.service';
import { newEvent } from '../../testing/index';

import * as _ from 'lodash';

let comp: TranscribeVideoComponent;
let fixture: ComponentFixture<TranscribeVideoComponent>;
let page: Page;

describe('TranscribeVideoComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [TranscribeVideoComponent],
            providers: [VideoService, HttpService, AuthService]
        }).compileComponents().then(createComponent);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TranscribeVideoComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    it('should have a dropdown with an option whose value is en-US and textContent is English (United States)', () => {
        const compiled = fixture.debugElement.nativeElement;

        const option = _.find(compiled.querySelector('select.language').options,
            {value: 'en-US'}) as HTMLOptionElement;

        return expect(option.textContent).toEqual('English (United States)');
    });

    it('should have a list of transcription transcriptionLanguages', () => {
        return expect(comp.languages.length).toBeGreaterThan(0);
    });

    it('should change the selected option in the language dropdown when the selected language model changes', () => {
        comp.selectedLanguage = _.find(GoogleCloudSpeechLanguages, {
            code: 'af-ZA'
        });

        const option = _.find(fixture.debugElement.query(By.css('select.language')).nativeElement.options,
            {value: 'af-ZA'}) as HTMLOptionElement;
        fixture.detectChanges();

        return expect(option.selected).toBeTruthy();
    });

    it('should change the selected language model when an option is selected in the language dropdown', async () => {
        const select: HTMLSelectElement = fixture.debugElement.query(By.css('select.language')).nativeElement;
        select.selectedIndex = _.findIndex(GoogleCloudSpeechLanguages, {code: 'af-ZA'});
        select.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        return expect(comp.selectedLanguage.code).toEqual('af-ZA');
    });

    it('should disable the transcribe button by default', () => {
        return expect(page.transcribeButton.disabled).toBeTruthy();
    });

    it('should list all possible video transcriptionLanguages', () => {
        return expect(page.languageSelect.options.length).toEqual(GoogleCloudSpeechLanguages.length);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(TranscribeVideoComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    page = new Page();
    page.refreshPageElements();

    return fixture.whenStable();
}

class Page {
    fileInput: HTMLInputElement;
    transcribeButton: HTMLButtonElement;
    languageSelect: HTMLSelectElement;

    refreshPageElements(): void {
        this.fileInput = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
        this.transcribeButton = fixture.debugElement.query(By.css('button.transcribe-button')).nativeElement;
        this.languageSelect = fixture.debugElement.query(By.css('select.language')).nativeElement;
    }
}
