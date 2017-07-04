import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexSpeakerComponent } from './index-speaker/index-speaker.component';
import { ShowSpeakerComponent } from './show-speaker/show-speaker.component';
import { SpeakerComponent } from './speaker.component';
import { SpeakerFormComponent } from './speaker-form/speaker-form.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, SpeakerFormComponent],
    exports: [IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, SpeakerFormComponent]
})
export class SpeakerModule {
}
