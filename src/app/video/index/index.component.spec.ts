import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVideoComponent } from './index.component';

describe('IndexVideoComponent', () => {
    let component: IndexVideoComponent;
    let fixture: ComponentFixture<IndexVideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IndexVideoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
