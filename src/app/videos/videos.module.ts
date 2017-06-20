import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { VideosService } from './videos.service';
import { VideosComponent } from './videos.component';
import { NewVideoComponent } from './new-video/new-video.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule // todo: this errors if I don't import it here -- why is it really necessary?
    ],
    declarations: [
        VideosComponent,
        NewVideoComponent
    ],
    providers: [
        VideosService
    ]
})
export class VideosModule {
}
