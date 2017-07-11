import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { NewVideoComponent } from './new.component';
import { VideoService } from '../video.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';

let comp: NewVideoComponent;
let fixture: ComponentFixture<NewVideoComponent>;
let page: Page;

describe('NewVideoComponent', () => {
    const mockSpeakerService = {
        getSpeakers(): Observable<any> {
            return Observable.of(MockApiResponse_SpeakersIndex.records);
        }
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, FormsModule],
            declarations: [NewVideoComponent],
            providers: [VideoService, HttpService, AuthService, LanguagesService, CategoriesService,
                {provide: SpeakerService, useValue: mockSpeakerService}
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });
});

function createComponent() {
    fixture = TestBed.createComponent(NewVideoComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    page = new Page();
    page.refreshPageElements();

    return fixture.whenStable();
}

class Page {
    refreshPageElements(): void {
        //
    }
}
