import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSpeakerComponent } from './new-speaker/new-speaker.component';
import { IndexSpeakerComponent } from './index-speaker/index-speaker.component';
import { ShowSpeakerComponent } from './show-speaker/show-speaker.component';
import { SpeakerComponent } from './speaker.component';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NewSpeakerComponent, IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, EditSpeakerComponent],
    exports: [NewSpeakerComponent, IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, EditSpeakerComponent]
})
export class SpeakerModule {
}
