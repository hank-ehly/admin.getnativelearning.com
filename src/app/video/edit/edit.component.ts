import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LanguagesService } from '../../core/languages.service';
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
                private lang: LanguagesService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        const cache: any = {};
        this.lang.getLanguages().concatMap(languages => {
            _.set(cache, 'languages', languages);
            return this.videoService.getVideo(this.route.snapshot.params['id']);
        }).concatMap(video => {
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
                picture_url: video.picture_url,
                video_url: video.video_url,
                is_public: video.is_public,
                localizations: localizations
            };
            return this.videoService.getVideoLocalizations(this.route.snapshot.params['id']);
        }).subscribe(videosLocalized => {
            console.log(videosLocalized, this.video.localizations);
            for (const localization of videosLocalized) {
                const editVideoObject = _.find(this.video.localizations, {language_id: localization.language_id});
                editVideoObject.id = localization.id;
                editVideoObject.description = localization.description;
            }
        });
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onFileChange(e: Event): void {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.video.file = _.first(inputElement.files);
        this.video.video_url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.video.file));
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

    private async handleUploadError(e: Response) {
        return window.alert(_.get(_.first(await e.json()), 'message', 'An unexpected error has occurred. Check console for details.'));
    }
}
