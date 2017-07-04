import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexSpeakerComponent } from './index/index.component';
import { ShowSpeakerComponent } from './show/show.component';
import { SpeakerComponent } from './speaker.component';
import { SpeakerFormComponent } from './form/form.component';
import { SpeakerService } from './speaker.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, SpeakerFormComponent],
    exports: [IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, SpeakerFormComponent],
    providers: [SpeakerService]
})
export class SpeakerModule {
}
