import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { VideosService } from './videos.service';
import { VideosComponent } from './videos.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule // todo: this errors if I don't import it here -- why is it really necessary?
    ],
    declarations: [
        VideosComponent
    ],
    providers: [
        VideosService
    ]
})
export class VideosModule {
}
