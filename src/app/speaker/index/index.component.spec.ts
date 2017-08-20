import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MockApiResponse_SpeakersIndex } from '../../testing/mock-api-responses/speakers-index';
import { IndexSpeakerComponent } from './index.component';
import { RouterStub } from '../../testing/router-stub';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { SpeakerService } from '../speaker.service';
import { SpeakerModule } from '../speaker.module';

import { Observable } from 'rxjs/Observable';

let comp: IndexSpeakerComponent;
let fixture: ComponentFixture<IndexSpeakerComponent>;
let page: Page;

describe('IndexSpeakerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SpeakerModule, HttpModule],
            providers: [HttpService, AuthService, {provide: Router, useClass: RouterStub}, {provide: ActivatedRoute, useValue: {}}]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        return expect(comp).toBeTruthy();
    });

    it('should call the speaker service "getSpeakers" method', () => {
        return expect(page.speakerIndexSpy).toHaveBeenCalledTimes(1);
    });

    it('should obtain a list of speakers', () => {
        return expect(comp.speakers.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should display the speaker name', () => {
        return expect(page.speakerNames.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should display the speaker gender name', () => {
        return expect(page.speakerGenderNames.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should display the speaker description', () => {
        return expect(page.speakerDescriptions.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should display the speaker location', () => {
        return expect(page.speakerLocations.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });

    it('should display the speaker picture', () => {
        return expect(page.speakerPictures.length).toEqual(MockApiResponse_SpeakersIndex.count);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(IndexSpeakerComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    speakerNames: HTMLElement[];
    speakerGenderNames: HTMLElement[];
    speakerDescriptions: HTMLElement[];
    speakerLocations: HTMLElement[];
    speakerPictures: HTMLImageElement[];
    speakerIndexSpy: jasmine.Spy;

    constructor() {
        spyOn(window, 'alert').and.returnValue(true);
        this.speakerIndexSpy = spyOn(fixture.debugElement.injector.get(SpeakerService), 'getSpeakers').and.returnValue(
            Observable.of(MockApiResponse_SpeakersIndex.records)
        );
    }

    refreshPageElements() {
        this.speakerNames = fixture.debugElement.queryAll(By.css('.name')).map(e => e.nativeElement);
        this.speakerGenderNames = fixture.debugElement.queryAll(By.css('.gender')).map(e => e.nativeElement);
        this.speakerDescriptions = fixture.debugElement.queryAll(By.css('.description')).map(e => e.nativeElement);
        this.speakerLocations = fixture.debugElement.queryAll(By.css('.location')).map(e => e.nativeElement);
        this.speakerPictures = fixture.debugElement.queryAll(By.css('.picture')).map(e => e.nativeElement);
    }
}
