import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories.service';
import { HttpService } from '../core/http.service';
import { HttpModule } from '@angular/http';
import { AuthService } from '../core/auth.service';
import { RouterStub } from '../testing/router-stub';
import { Router } from '@angular/router';
import { RouterLinkStubDirective } from '../testing/router-link-stub.directive';

describe('CategoriesComponent', () => {
    let component: CategoriesComponent;
    let fixture: ComponentFixture<CategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                CategoriesComponent,
                RouterLinkStubDirective
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService,
                {provide: Router, useClass: RouterStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
