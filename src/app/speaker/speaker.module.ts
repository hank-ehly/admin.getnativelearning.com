import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexSpeakerComponent } from './index/index.component';
import { ShowSpeakerComponent } from './show/show.component';
import { SpeakerComponent } from './speaker.component';
import { SpeakerFormComponent } from './form/form.component';
import { SpeakerService } from './speaker.service';
import { NewSpeakerComponent } from './new/new.component';
import { EditSpeakerComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        NewSpeakerComponent,
        EditSpeakerComponent,
        IndexSpeakerComponent,
        ShowSpeakerComponent,
        SpeakerComponent,
        SpeakerFormComponent
    ],
    exports: [IndexSpeakerComponent, ShowSpeakerComponent, SpeakerComponent, SpeakerFormComponent],
    providers: [SpeakerService]
})
export class SpeakerModule {
}
