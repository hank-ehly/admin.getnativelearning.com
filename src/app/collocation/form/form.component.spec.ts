import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CollocationFormComponent } from './form.component';
import { CollocationModule } from '../collocation.module';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';

describe('CollocationFormComponent', () => {
    let component: CollocationFormComponent;
    let fixture: ComponentFixture<CollocationFormComponent>;

    const ActivatedRouteStubProvider = {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params: {
                    id: 1
                }
            }
        }
    };

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [CollocationModule, FormsModule, HttpModule],
            providers: [HttpService, AuthService, ActivatedRouteStubProvider]
        }).compileComponents();
    }));

    beforeEach(() => {
        spyOn(window, 'alert').and.returnValue(true);
        fixture = TestBed.createComponent(CollocationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
