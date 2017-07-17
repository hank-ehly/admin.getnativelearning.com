import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { RouterStub } from '../testing/router-stub';
import { VideoComponent } from './video.component';
import { HttpService } from '../core/http.service';
import { AuthService } from '../core/auth.service';
import { VideoService } from './video.service';
import { VideoModule } from './video.module';

let component: VideoComponent;
let fixture: ComponentFixture<VideoComponent>;

describe('VideoComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [VideoModule, RouterTestingModule, HttpModule, FormsModule],
            providers: [VideoService, HttpService, AuthService, {provide: Router, useClass: RouterStub}]
        }).compileComponents().then(createComponent);
    }));

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
});

function createComponent() {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable();
}
