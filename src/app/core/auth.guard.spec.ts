import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { RouterStub } from '../testing/router-stub';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                AuthService,
                {provide: Router, useClass: RouterStub}
            ]
        });
    });

    it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
