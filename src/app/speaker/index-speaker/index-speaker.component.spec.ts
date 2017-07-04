import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSpeakerComponent } from './index-speaker.component';

describe('IndexSpeakerComponent', () => {
    let component: IndexSpeakerComponent;
    let fixture: ComponentFixture<IndexSpeakerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndexSpeakerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexSpeakerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
