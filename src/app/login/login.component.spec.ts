import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { HttpService } from '../core/http.service';
import { RouterStub } from '../testing/router-stub';
import { AuthService } from '../core/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                LoginService,
                HttpService,
                AuthService,
                {provide: Router, useClass: RouterStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have a credentials model', () => {
        expect(component.credentials).toBeTruthy();
    });

    it('should have a blank email credential upon page load', () => {
        expect(component.credentials.email).toBe('');
    });

    it('should display an empty email input upon page load', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('input[type=email]').textContent).toEqual('');
    });

    it('should have a blank password credential upon page load', () => {
        expect(component.credentials.email).toBe('');
    });

    it('should display an empty password input upon page load', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('input[type=password]').textContent).toEqual('');
    });
});
