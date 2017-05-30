import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosComponent } from './videos.component';
import { VideosService } from './videos.service';
import { HttpService } from '../core/http.service';
import { HttpModule } from '@angular/http';
import { AuthService } from '../core/auth.service';

import * as _ from 'lodash';
import { By } from '@angular/platform-browser';
import { GoogleCloudSpeechLanguages } from './google-cloud-speech-languages';

describe('VideosComponent', () => {
    let component: VideosComponent;
    let fixture: ComponentFixture<VideosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [VideosComponent],
            providers: [VideosService, HttpService, AuthService]
        })
            .compileComponents();
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

    it('should change the language model after selecting a language from the dropdown', async () => {
        component.selectedLanguage = _.find(GoogleCloudSpeechLanguages, {
            code: 'af-ZA'
        });

        const option = _.find(fixture.debugElement.query(By.css('select')).nativeElement.options, {value: 'af-ZA'});
        fixture.detectChanges();

        expect(option.selected).toBeTruthy();
    });
});
