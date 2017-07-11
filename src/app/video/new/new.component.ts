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
        transcripts: [],
        descriptions: []
    };

    constructor(private lang: LanguagesService) {
    }

    ngOnInit(): void {
        this.lang.getLanguages().subscribe((languages: any[]) => {
            _.each(languages, l => this.video.transcripts.push({language_id: l.id, text: _.stubString()}));
            _.each(languages, l => this.video.descriptions.push({language_id: l.id, description: _.stubString()}));
        })
    }
}
