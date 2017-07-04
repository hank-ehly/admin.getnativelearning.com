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
