import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerFormComponent } from './form.component';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { SpeakerModule } from '../speaker.module';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { By } from '@angular/platform-browser';
import { SpeakerService } from '../speaker.service';
import { MockApiResponse_GendersIndex } from '../../testing/mock-api-responses/genders-index';

let comp: SpeakerFormComponent;
let fixture: ComponentFixture<SpeakerFormComponent>;
let page: Page;

describe('SpeakerFormComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SpeakerModule, HttpModule],
            providers: [LanguagesService, HttpService, AuthService]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    describe('component model', () => {
        it('should initialize a model object with a genderId property', () => {
            return expect(comp.speaker.genderId).toBeNull();
        });

        it('should initialize a model object with a picture property', () => {
            return expect(comp.speaker.picture).toBeNull();
        });

        it('should initialize a model with a localizations array containing as many objects as there are languages', () => {
            const numberOfLanguages = 2;
            return expect(comp.speaker.localizations.length).toEqual(numberOfLanguages);
        });

        it('should initialize a localization object with a description property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            return expect(firstLocalization.description).toBeNull();
        });

        it('should initialize a localization object with a name property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            return expect(firstLocalization.name).toBeNull();
        });

        it('should initialize a localization object with a location property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            return expect(firstLocalization.location).toBeNull();
        });
    });

    describe('template bindings', () => {
        it('should bind the genderId to the template as a radio selection', () => {
            // change radio value
            const genderObj = _.find(comp.genders, {name: 'male'});
            page.genderInput.value = genderObj['id'].toString();
            page.genderInput.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            // expect model value to have changed
            return expect(comp.speaker.genderId).toEqual(genderObj['id']);
        });

        it('should bind the speaker.picture model to the template as a file input', () => {
            return expect(page.pictureInput).toBeTruthy();
        });

        it('should bind a localization.description to the template as a textarea', () => {
            // change description value
            const testValue = 'Test Description';
            const firstDesc = _.first(page.lzDescTextAreaEls);
            firstDesc.value = testValue;
            firstDesc.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            // expect description value to equal change
            return expect(_.first(comp.speaker.localizations).description).toEqual(testValue);
        });

        it('should bind a localization.name to the template as a text input', () => {
            // change name value
            const testValue = 'Test Name';
            const firstName = _.first(page.lzNameTextInputEls);
            firstName.value = testValue;
            firstName.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            // expect name value to equal change
            return expect(_.first(comp.speaker.localizations).name).toEqual(testValue);
        });

        it('should bind a localization.location to the template as a text input', () => {
            // change location value
            const testValue = 'Test Location';
            const firstLocation = _.first(page.lzLocTextInputEls);
            firstLocation.value = testValue;
            firstLocation.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            // expect location value to equal change
            return expect(_.first(comp.speaker.localizations).location).toEqual(testValue);
        });
    });

    describe('"create" request', () => {
        it('should make a "create" API request upon form submission');
        it('should disable the submit button after starting the "create" request');
        it('should enable the submit button if the "create" request fails');
        it('redirect the user to the show component after a successful create request');
        it('should display a browser alert after a failed request');
    });
});

function createComponent() {
    fixture = TestBed.createComponent(SpeakerFormComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    genderInput: HTMLInputElement;
    pictureInput: HTMLInputElement;
    lzDescTextAreaEls: HTMLTextAreaElement[];
    lzNameTextInputEls: HTMLInputElement[];
    lzLocTextInputEls: HTMLInputElement[];

    constructor() {
        spyOn(fixture.debugElement.injector.get(SpeakerService), 'getGenders').and
            .returnValue(Observable.of(MockApiResponse_GendersIndex.records));
        spyOn(fixture.debugElement.injector.get(LanguagesService), 'getLanguages').and
            .returnValue(Observable.of(MockApiResponse_LanguagesIndex.records));
    }

    refreshPageElements() {
        this.genderInput = fixture.debugElement.query(By.css('input[type=radio]')).nativeElement;
        this.pictureInput = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
        this.lzDescTextAreaEls = fixture.debugElement.queryAll(By.css('textarea.description')).map(e => e.nativeElement);
        this.lzNameTextInputEls = fixture.debugElement.queryAll(By.css('input[type=text].name')).map(e => e.nativeElement);
        this.lzLocTextInputEls = fixture.debugElement.queryAll(By.css('input[type=text].location')).map(e => e.nativeElement);
    }
}
