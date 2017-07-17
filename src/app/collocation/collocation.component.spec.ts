import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocationComponent } from './collocation.component';
import { RouterStub } from '../testing/router-stub';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../core/http.service';

describe('CollocationComponent', () => {
    let component: CollocationComponent;
    let fixture: ComponentFixture<CollocationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CollocationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
