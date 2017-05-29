import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosComponent } from './videos.component';
import { VideoTranscriptionService } from './video-transcription.service';
import { HttpService } from '../core/http.service';
import { HttpModule } from '@angular/http';

describe('VideosComponent', () => {
    let component: VideosComponent;
    let fixture: ComponentFixture<VideosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [VideosComponent],
            providers: [VideoTranscriptionService, HttpService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Videos'`, () => {
        expect(component.title).toEqual('Videos');
    });

    it('should render title in a h1 tag', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Videos');
    });

    it('contains a file input element', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('input[type=file]').length).toEqual(1);
    });

    it('contains an empty textarea', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('textarea').length).toEqual(1);
    });
});
