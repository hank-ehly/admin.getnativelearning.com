import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { EditSpeakerComponent } from './edit.component';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerModule } from '../speaker.module';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { MockApiResponse_GendersIndex } from '../../testing/mock-api-responses/genders-index';
import { SpeakerService } from '../speaker.service';
import { Observable } from 'rxjs/Observable';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';

let comp: EditSpeakerComponent;
let fixture: ComponentFixture<EditSpeakerComponent>;
let page: Page;

describe('EditSpeakerComponent', () => {
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
    fixture = TestBed.createComponent(EditSpeakerComponent);
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
