import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_LanguagesIndex } from '../../testing/mock-api-responses/languages-index';
import { MockApiResponse_VideosIndex } from '../../testing/mock-api-responses/videos-index';
import { RouterLinkStubDirective } from '../../testing/router-link-stub.directive';
import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { IndexVideoComponent } from './index.component';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs/Observable';

describe('IndexVideoComponent', () => {
    let component: IndexVideoComponent;
    let fixture: ComponentFixture<IndexVideoComponent>;

    const mockLanguageService = {
        getLanguages(): Observable<any> {
            return Observable.of(MockApiResponse_LanguagesIndex.records);
        }
    };

    const mockVideoService = {
        getVideos(params: any): Observable<any> {
            return Observable.of(MockApiResponse_VideosIndex.records);
        }
    };

    const mockCategoriesService = {
        getCategories(): Observable<any> {
            return Observable.of(MockApiResponse_CategoriesIndex.records);
        }
    };

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [IndexVideoComponent, RouterLinkStubDirective],
            providers: [{provide: LanguagesService, useValue: mockLanguageService}, HttpService, AuthService,
                {provide: CategoriesService, useValue: mockCategoriesService}, {provide: VideoService, useValue: mockVideoService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        spyOn(window, 'alert').and.returnValue(true);
        fixture = TestBed.createComponent(IndexVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
