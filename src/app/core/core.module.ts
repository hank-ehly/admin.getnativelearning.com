import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpService } from './http.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LanguagesService } from './languages.service';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        HttpService,
        AuthGuard,
        AuthService,
        LanguagesService
    ]
})
export class CoreModule {
}
