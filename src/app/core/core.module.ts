import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpService } from './http.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        HttpService,
        AuthGuard,
        AuthService
    ]
})
export class CoreModule {
}
