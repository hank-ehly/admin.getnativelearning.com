import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosComponent } from './videos.component';
import { VideoTranscriptionService } from './video-transcription.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VideosComponent
    ],
    providers: [
        VideoTranscriptionService
    ]
})
export class VideosModule {
}
