import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LanguagesService } from '../../core/languages.service';
import { APIError } from '../../core/api-error';
import { VideoService } from '../video.service';
import { Video } from '../../models/video';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-video',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditVideoComponent implements OnInit, OnDestroy {

    video: Video = {
        id: null,
        speaker_id: null,
        language_id: null,
        subcategory_id: null,
        localizations: []
    };

    isRequestInProgress = false;
    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideoService,
                private route: ActivatedRoute,
                private lang: LanguagesService) {
    }

    ngOnInit() {
        const cache: any = {};
        this.lang.getLanguages().concatMap(languages => {
            _.set(cache, 'languages', languages);
            return this.videoService.getVideo(this.route.snapshot.params['id']);
        }).subscribe(video => {
            const localizations = [];
            for (const transcript of video.transcripts.records) {
                localizations.push({
                    language_id: transcript.language.id,
                    transcript: transcript.text
                });
            }
            this.video = {
                id: video.id,
                speaker_id: video.speaker.id,
                language_id: video.language.id,
                subcategory_id: video.subcategory.id,
                is_public: video.is_public,
                localizations: localizations,
                youtube_video_id: video.youtube_video_id
            };
        });
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onFileChange(e: Event): void {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.video.file = _.first(inputElement.files);
    }

    onClickUpload(): void {
        this.isRequestInProgress = true;
        this.subscriptions.push(
            this.videoService.uploadVideo(this.video.id, this.video.file)
                .subscribe(this.handleUploadSuccess.bind(this), this.handleUploadError, () => this.isRequestInProgress = false)
        );
    }

    private handleUploadSuccess(video: any) {
        if (_.isPlainObject(video)) {
            _.assign(this.video, video);
        }
    }

    private async handleUploadError(e: APIError[]) {
        return window.alert(_.get(_.first(e), 'message', 'An unexpected error has occurred. Check console for details.'));
    }
}
