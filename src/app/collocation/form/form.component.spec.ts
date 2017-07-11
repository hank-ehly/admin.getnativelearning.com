import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocationFormComponent } from './form.component';

describe('CollocationFormComponent', () => {
    let component: CollocationFormComponent;
    let fixture: ComponentFixture<CollocationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollocationFormComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollocationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
