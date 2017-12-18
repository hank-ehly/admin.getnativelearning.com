import { Component, OnInit } from '@angular/core';

import { LanguagesService } from '../../core/languages.service';
import { Video } from '../../models/video';

import * as _ from 'lodash';

@Component({
    selector: 'gn-new-video',
    templateUrl: './new.component.html'
})
export class NewVideoComponent implements OnInit {
    video: Video = {
        subcategory_id: null,
        file: null,
        speaker_id: null,
        language_id: null,
        is_public: false,
        localizations: [],
        youtube_video_id: null
    };

    constructor(private lang: LanguagesService) {
    }

    ngOnInit(): void {
        this.lang.getLanguages().subscribe((languages: any[]) => {
            _.each(languages, l => this.video.localizations.push({
                language_id: l.id,
                transcript: _.stubString()
            }));
        })
    }
}
