import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { VideoModule } from './video/video.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { CategoriesModule } from './categories/categories.module';
import { SpeakerModule } from './speaker/speaker.module';
import { CollocationModule } from './collocation/collocation.module';
import { TestingModule } from './testing/testing.module';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UsersComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        FormsModule,
        AppRoutingModule,
        SharedModule,
        VideoModule,
        CategoriesModule,
        SpeakerModule,
        CollocationModule,
        TestingModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
