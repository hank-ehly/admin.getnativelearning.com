import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { VideoService } from './video.service';
import { VideoComponent } from './video.component';
import { NewVideoComponent } from './new/new.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule // todo: this errors if I don't import it here -- why is it really necessary?
    ],
    declarations: [
        VideoComponent,
        NewVideoComponent
    ],
    providers: [
        VideoService
    ]
})
export class VideoModule {
}
