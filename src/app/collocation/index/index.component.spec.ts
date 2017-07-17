import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterLinkStubDirective } from '../../testing/router-link-stub.directive';
import { IndexCollocationComponent } from './index.component';
import { CollocationModule } from '../collocation.module';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';

describe('IndexCollocationComponent', () => {
    let component: IndexCollocationComponent;
    let fixture: ComponentFixture<IndexCollocationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CollocationModule, FormsModule, HttpModule],
            declarations: [RouterLinkStubDirective],
            providers: [HttpService, AuthService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexCollocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
