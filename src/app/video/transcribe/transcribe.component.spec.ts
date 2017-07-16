import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeVideoComponent } from './transcribe.component';

describe('TranscribeVideoComponent', () => {
    let component: TranscribeVideoComponent;
    let fixture: ComponentFixture<TranscribeVideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TranscribeVideoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TranscribeVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
