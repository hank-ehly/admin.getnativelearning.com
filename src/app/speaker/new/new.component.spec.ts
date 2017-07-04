import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_GendersIndex } from 'app/testing/mock-api-responses/genders-index';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from 'app/speaker/speaker.service';
import { NewSpeakerComponent } from './new.component';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { SpeakerModule } from '../speaker.module';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

let comp: NewSpeakerComponent;
let fixture: ComponentFixture<NewSpeakerComponent>;
let page: Page;

describe('NewSpeakerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SpeakerModule, HttpModule],
            providers: [LanguagesService, HttpService, AuthService]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        expect(comp).toBeTruthy();
    });

    it('should initialize a speaker with a null gender.id', () => {
        expect(comp.speaker.gender.id).toBeNull();
    });

    it('should initialize a speaker with a pictureUrl set to an empty string', () => {
        expect(comp.speaker.pictureUrl).toEqual('');
    });

    it('should initialize a speaker with as many localization objects as there are languages', () => {
        expect(comp.speaker.localizations.length).toEqual(MockApiResponse_LanguagesIndex.count);
    });

    it('should initialize a speaker with a localizations[N].description set to an empty string', () => {
        expect(_.first(comp.speaker.localizations)['description']).toEqual('');
    });

    it('should initialize a speaker with a localizations[N].name set to an empty string', () => {
        expect(_.first(comp.speaker.localizations)['name']).toEqual('');
    });

    it('should initialize a speaker with a localizations[N].location set to an empty string', () => {
        expect(_.first(comp.speaker.localizations)['location']).toEqual('');
    });

    it('should initialize a speaker with a localizations[N].language object', () => {
        expect(_.first(comp.speaker.localizations)['language']).toBeDefined();
    });

    it('should initialize a speaker with a localizations[N].language.id', () => {
        expect(_.first(comp.speaker.localizations)['language'].id).toEqual(_.first(MockApiResponse_LanguagesIndex.records).id);
    });

    it('should initialize a speaker with a localizations[N].language.code', () => {
        expect(_.first(comp.speaker.localizations)['language'].code).toEqual(_.first(MockApiResponse_LanguagesIndex.records).code);
    });

    it('should initialize a speaker with a localizations[N].language.name', () => {
        expect(_.first(comp.speaker.localizations)['language'].name).toEqual(_.first(MockApiResponse_LanguagesIndex.records).name);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(NewSpeakerComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    constructor() {
        spyOn(fixture.debugElement.injector.get(SpeakerService), 'getGenders').and
            .returnValue(Observable.of(MockApiResponse_GendersIndex.records));
        spyOn(fixture.debugElement.injector.get(LanguagesService), 'getLanguages').and
            .returnValue(Observable.of(MockApiResponse_LanguagesIndex.records));
    }

    refreshPageElements() {
    }
}
