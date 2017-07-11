import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoComponent } from './edit.component';

describe('EditVideoComponent', () => {
    let component: EditVideoComponent;
    let fixture: ComponentFixture<EditVideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditVideoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
