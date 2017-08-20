import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MockApiResponse_SpeakersLocalizedIndex } from '../../testing/mock-api-responses/speakers-localized-index';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_SpeakersShow } from '../../testing/mock-api-responses/speakers-show';
import { MockApiResponse_GendersIndex } from '../../testing/mock-api-responses/genders-index';
import { LanguagesService } from '../../core/languages.service';
import { EditSpeakerComponent } from './edit.component';
import { RouterStub } from '../../testing/router-stub';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { SpeakerService } from '../speaker.service';
import { SpeakerModule } from '../speaker.module';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

let comp: EditSpeakerComponent;
let fixture: ComponentFixture<EditSpeakerComponent>;
let page: Page;

describe('EditSpeakerComponent', () => {
    const ActivatedRouteStubProvider = {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params: {
                    id: MockApiResponse_SpeakersShow.id
                }
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SpeakerModule, HttpModule],
            providers: [LanguagesService, HttpService, AuthService, ActivatedRouteStubProvider, {provide: Router, useClass: RouterStub}]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    it('should fetch the speaker data', () => {
        return expect(page.getSpeakerSpy).toHaveBeenCalledTimes(1);
    });

    it('should fetch the localized speaker data', () => {
        return expect(page.getSpeakerLocalizationsSpy).toHaveBeenCalledTimes(1);
    });

    it('should initialize a speaker object with a gender.id number property', () => {
        return expect(comp.speaker.gender.id).toEqual(MockApiResponse_SpeakersShow.gender.id);
    });

    it('should initialize a speaker object with a pictureUrl string property', () => {
        return expect(comp.speaker.pictureUrl).toEqual(MockApiResponse_SpeakersShow.picture_url);
    });
    it('should initialize a speaker object with a localizations array property', () => {
        return expect(_.isArray(comp.speaker.localizations));
    });

    it('should initialize a speaker object with a localizations[N].description string property', () => {
        const expected = _.first(MockApiResponse_SpeakersLocalizedIndex.records).description;
        return expect(_.first(comp.speaker.localizations)['description']).toEqual(expected);
    });

    it('should initialize a speaker object with a localizations[N].name string property', () => {
        const expected = _.first(MockApiResponse_SpeakersLocalizedIndex.records).name;
        return expect(_.first(comp.speaker.localizations)['name']).toEqual(expected)
    });

    it('should initialize a speaker object with a localizations[N].location string property', () => {
        const expected = _.first(MockApiResponse_SpeakersLocalizedIndex.records).location;
        return expect(_.first(comp.speaker.localizations)['location']).toEqual(expected)
    });
});

function createComponent() {
    fixture = TestBed.createComponent(EditSpeakerComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    getSpeakerSpy: jasmine.Spy;
    getSpeakerLocalizationsSpy: jasmine.Spy;

    constructor() {
        spyOn(window, 'alert').and.returnValue(true);
        spyOn(fixture.debugElement.injector.get(SpeakerService), 'getGenders').and
            .returnValue(Observable.of(MockApiResponse_GendersIndex.records));
        spyOn(fixture.debugElement.injector.get(LanguagesService), 'getLanguages').and
            .returnValue(Observable.of(MockApiResponse_LanguagesIndex.records));
        this.getSpeakerSpy = spyOn(fixture.debugElement.injector.get(SpeakerService), 'getSpeaker').and
            .returnValue(Observable.of(MockApiResponse_SpeakersShow));
        this.getSpeakerLocalizationsSpy = spyOn(fixture.debugElement.injector.get(SpeakerService), 'getSpeakerLocalizations').and
            .returnValue(Observable.of(MockApiResponse_SpeakersLocalizedIndex.records));
    }

    refreshPageElements() {
    }
}
