import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';
import { MockApiResponse_VideosIndex } from '../../testing/mock-api-responses/videos-index';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { VideoFormComponent } from '../form/form.component';
import { RouterStub } from '../../testing/router-stub';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { NewVideoComponent } from './new.component';
import { VideoService } from '../video.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_VideosCreate } from '../../testing/mock-api-responses/videos-create';

let comp: NewVideoComponent;
let fixture: ComponentFixture<NewVideoComponent>;

describe('NewVideoComponent', () => {
    const mockSpeakerService = {
        getSpeakers(): Observable<any> {
            return Observable.of(MockApiResponse_SpeakersIndex.records);
        }
    };

    const mockLanguageService = {
        getLanguages(): Observable<any> {
            return Observable.of(MockApiResponse_LanguagesIndex.records);
        }
    };

    const mockVideoService = {
        createVideo(file: File, body: any): Observable<any> {
            return Observable.of(MockApiResponse_VideosCreate.id);
        },

        updateVideo(id: number, body: any): Observable<any> {
            return Observable.of({});
        }
    };

    const mockCategoriesService = {
        getCategories(): Observable<any> {
            return Observable.of(MockApiResponse_CategoriesIndex.records);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, FormsModule],
            declarations: [NewVideoComponent, VideoFormComponent],
            providers: [{provide: VideoService, useValue: mockVideoService}, HttpService, AuthService,
                {provide: LanguagesService, useValue: mockLanguageService}, {provide: CategoriesService, useValue: mockCategoriesService},
                {provide: SpeakerService, useValue: mockSpeakerService}, {provide: Router, useClass: RouterStub}]
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
    return fixture.whenStable();
}
