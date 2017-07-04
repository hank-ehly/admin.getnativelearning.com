import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeakerComponent } from './edit.component';

describe('EditSpeakerComponent', () => {
    let component: EditSpeakerComponent;
    let fixture: ComponentFixture<EditSpeakerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditSpeakerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditSpeakerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
