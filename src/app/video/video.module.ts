import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { VideoService } from './video.service';
import { VideoComponent } from './video.component';
import { NewVideoComponent } from './new/new.component';
import { VideoFormComponent } from './form/form.component';
import { EditVideoComponent } from './edit/edit.component';
import { TranscribeVideoComponent } from './transcribe/transcribe.component';
import { IndexVideoComponent } from './index/index.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpModule // todo: this errors if I don't import it here -- why is it really necessary?
    ],
    declarations: [
        VideoComponent,
        NewVideoComponent,
        VideoFormComponent,
        EditVideoComponent,
        TranscribeVideoComponent,
        IndexVideoComponent
    ],
    providers: [
        VideoService
    ],
    exports: [VideoFormComponent, EditVideoComponent, NewVideoComponent, TranscribeVideoComponent, IndexVideoComponent]
})
export class VideoModule {
}
