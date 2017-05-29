import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent]
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
