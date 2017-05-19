import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { VideosModule } from './videos/videos.module';

@NgModule({
    declarations: [AppComponent, CategoriesComponent, DashboardComponent, UsersComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        VideosModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
