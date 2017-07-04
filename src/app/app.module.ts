import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { VideosModule } from './videos/videos.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { CategoriesModule } from './categories/categories.module';
import { SpeakerModule } from './speaker/speaker.module';

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
        VideosModule,
        CategoriesModule,
        SpeakerModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
