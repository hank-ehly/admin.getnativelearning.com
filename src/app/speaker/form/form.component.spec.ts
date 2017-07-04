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
        expect(comp).toBeTruthy();
    });

    describe('component model', () => {
        it('should initialize a model object with a genderId property', () => {
            expect(comp.speaker.genderId).toBeNull();
        });

        it('should initialize a model with a localizations array containing as many objects as there are languages', () => {
            const numberOfLanguages = 2;
            expect(comp.speaker.localizations.length).toEqual(numberOfLanguages);
        });

        it('should initialize a localization object with a description property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            expect(firstLocalization.description).toBeNull();
        });

        it('should initialize a localization object with a name property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            expect(firstLocalization.name).toBeNull();
        });

        it('should initialize a localization object with a location property', () => {
            const firstLocalization = _.first(comp.speaker.localizations);
            expect(firstLocalization.location).toBeNull();
        });
    });

    describe('template bindings', () => {
        it('should bind the genderId to the template as a radio selection');
        it('should bind a localization.description to the template as a textarea');
        it('should bind a localization.name to the template as a text input');
        it('should bind a localization.location to the template as a text input');
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
    constructor() {
        spyOn(fixture.debugElement.injector.get(LanguagesService), 'getLanguages').and
            .returnValue(Observable.of(MockApiResponse_LanguagesIndex.records));
    }

    refreshPageElements() {
        //
    }
}
