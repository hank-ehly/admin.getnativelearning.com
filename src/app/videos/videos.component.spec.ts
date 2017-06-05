import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';
import { VideosComponent } from './videos.component';
import { RouterStub } from '../testing/router-stub';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';
import { VideosService } from './videos.service';

import * as _ from 'lodash';

describe('VideosComponent', () => {
    let component: VideosComponent;
    let fixture: ComponentFixture<VideosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule
            ],
            declarations: [
                VideosComponent
            ],
            providers: [
                VideosService,
                HttpService,
                AuthService,
                {provide: Router, useClass: RouterStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Videos'`, () => {
        expect(component.title).toEqual('Videos');
    });

    it('should render title in a h1 tag', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Videos');
    });

    it('contains a file input element', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('input[type=file]').length).toEqual(1);
    });

    it('contains an empty textarea', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('textarea').length).toEqual(1);
    });

    it('should have a dropdown for video language selection', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('select').length).toEqual(1);
    });

    it('should have a dropdown with an option whose value is en-US and textContent is English (United States)', () => {
        const compiled = fixture.debugElement.nativeElement;

        const option = _.find(compiled.querySelector('select').options, {
            value: 'en-US'
        });

        expect(option).toBeTruthy();
        expect(option.textContent).toEqual('English (United States)');
    });

    it('should have a list of languages', () => {
        expect(component.languages.length).toBeGreaterThan(0);
    });

    it('should change the selected option in the language dropdown when the selected language model changes', () => {
        component.selectedLanguage = _.find(GoogleCloudSpeechLanguages, {
            code: 'af-ZA'
        });

        const option = _.find(fixture.debugElement.query(By.css('select')).nativeElement.options, {value: 'af-ZA'});
        fixture.detectChanges();

        expect(option.selected).toBeTruthy();
    });

    it('should change the selected language model when an option is selected in the language dropdown', async () => {
        const select: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
        select.selectedIndex = _.findIndex(GoogleCloudSpeechLanguages, {code: 'af-ZA'});
        select.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.selectedLanguage.code).toEqual('af-ZA');
    });

    it('should disable the transcribe button by default', () => {
        const transcribeButton = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(transcribeButton.disabled).toBeTruthy();
    });

    it('should enable the transcribe button after the selectedVideoFile is populated', () => {
        const transcribeButton = fixture.debugElement.query(By.css('button')).nativeElement;
        component.selectedVideoFile = new File([], 'file');
        fixture.detectChanges();
        expect(transcribeButton.disabled).toBeFalsy();
    });
});
