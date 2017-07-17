import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { RouterStub } from '../../testing/router-stub';
import { EditVideoComponent } from './edit.component';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { VideoModule } from '../video.module';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { Observable } from 'rxjs/Observable';
import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';

describe('EditVideoComponent', () => {
    let component: EditVideoComponent;
    let fixture: ComponentFixture<EditVideoComponent>;

    const ActivatedRouteStubProvider = {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params: {
                    id: 1
                }
            }
        }
    };

    const mockSpeakerService = {
        getSpeakers(): Observable<any> {
            return Observable.of(MockApiResponse_SpeakersIndex.records);
        }
    };

    const mockCategoriesService = {
        getCategories(): Observable<any> {
            return Observable.of(MockApiResponse_CategoriesIndex.records);
        }
    };

    const mockLanguageService = {
        getLanguages(): Observable<any> {
            return Observable.of(MockApiResponse_LanguagesIndex.records);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [VideoModule, HttpModule],
            providers: [HttpService, AuthService, ActivatedRouteStubProvider, {provide: LanguagesService, useValue: mockLanguageService},
                {provide: CategoriesService, useValue: mockCategoriesService}, {provide: SpeakerService, useValue: mockSpeakerService},
                {provide: Router, useClass: RouterStub}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
