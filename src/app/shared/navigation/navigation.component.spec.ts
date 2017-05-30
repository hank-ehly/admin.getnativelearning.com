import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigationComponent } from './navigation.component';
import { RouterStub } from '../../testing/router-stub';
import { AuthService } from '../../core/auth.service';
import { RouterLinkStubDirective } from '../../testing/router-link-stub.directive';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationComponent, RouterLinkStubDirective],
            providers: [
                {provide: Router, useClass: RouterStub},
                AuthService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
