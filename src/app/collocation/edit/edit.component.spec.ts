import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';

import { EditCollocationComponent } from './edit.component';
import { CollocationModule } from '../collocation.module';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';

describe('EditCollocationComponent', () => {
    let component: EditCollocationComponent;
    let fixture: ComponentFixture<EditCollocationComponent>;

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
            imports: [CollocationModule, HttpModule],
            providers: [HttpService, AuthService, ActivatedRouteStubProvider]
        }).compileComponents();
    }));

    beforeEach(() => {
        spyOn(window, 'alert').and.returnValue(true);
        fixture = TestBed.createComponent(EditCollocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        return expect(component).toBeTruthy();
    });
});
