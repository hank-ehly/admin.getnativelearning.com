import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LanguagesService } from '../../core/languages.service';
import { VideoService } from '../video.service';
import { Video } from '../../models/video';

import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-video',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditVideoComponent implements OnInit {
    video: Video = {
        speaker_id: null,
        language_id: null,
        subcategory_id: null,
        transcripts: [],
        descriptions: []
    };

    constructor(private videoService: VideoService, private route: ActivatedRoute, private lang: LanguagesService) {
    }

    ngOnInit() {
        const cache: any = {};
        this.lang.getLanguages().concatMap(languages => {
            _.set(cache, 'languages', languages);
            return this.videoService.getVideo(this.route.snapshot.params['id']);
        }).concatMap(video => {
            const transcripts = _.each(video.transcripts.records, r => {
                r.language_id = _.find(cache.languages, {code: r.language.code})['id'];
                _.unset(r, 'collocation_occurrences');
                _.unset(r, 'language');
                return r;
            });
            this.video = {
                speaker_id: video.speaker.id,
                language_id: video.language.id,
                transcripts: transcripts,
                subcategory_id: video.subcategory.id,
                picture_url: video.picture_url,
                video_url: video.video_url,
                is_public: video.is_public
            };
            return this.videoService.getVideoLocalizations(this.route.snapshot.params['id']);
        }).subscribe(videosLocalized => {
            this.video.descriptions = videosLocalized;
        });
    }
}
