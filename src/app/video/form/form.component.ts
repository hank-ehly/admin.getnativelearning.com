import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../../categories/categories.service';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { VideoService } from '../video.service';
import { Video } from '../../models/video';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { APIError } from '../../core/api-error';

@Component({
    selector: 'gn-video-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class VideoFormComponent implements OnInit, OnDestroy, AfterViewInit {

    languages: any[];
    categories: any[];
    speakers: any[];
    youTubeVideoId: string;

    @Input() video: Video;

    private subscriptions: Subscription[] = [];

    constructor(private videoService: VideoService,
                private langService: LanguagesService,
                private categoryService: CategoriesService,
                private speakerService: SpeakerService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.langService.getLanguages().subscribe((languages: any[]) => this.languages = languages),
            this.categoryService.getCategories().subscribe((categories: any[]) => this.categories = _.sortBy(categories, 'name')),
            this.speakerService.getSpeakers().subscribe(speakers => this.speakers = _.sortBy(speakers, ['name', 'location']))
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    ngAfterViewInit(): void {
    }

    nameOfLanguageForId(id: number): string {
        return _.get(_.find(this.languages, {id: id}), 'name', _.stubString());
    }

    onYouTubeVideoIdChange(): void {
        console.log('*****');
    }

    onSubmit(): void {
        const body = {
            is_public: this.video.is_public,
            subcategory_id: this.video.subcategory_id,
            language_id: this.video.language_id,
            speaker_id: this.video.speaker_id,
            localizations: this.video.localizations,
            youtube_video_id: this.video.youtube_video_id
        };

        let subscription;
        if (this.video.id) {
            subscription = this.videoService.updateVideo(this.video.id, body).subscribe(() => {
                window.alert('Video updated successfully.');
            }, this.handleError);
        } else {
            subscription = this.videoService.createVideo(this.video.file, body)
                .subscribe(this.handleCreateSuccess.bind(this), this.handleError);
        }

        this.subscriptions.push(subscription);
    }

    onDeleteWritingQuestionForLanguageAtIndex(languageId: number, i: number): void {
        const localization = _.find(this.video.localizations, {language_id: languageId});

        if (!localization.writing_questions) {
            alert('[error] !localization.writing_questions');
            return;
        }

        localization.writing_questions.splice(i, 1);
    }

    onClickAddQuestionForLanguage(languageId: number): void {
        const localization = _.find(this.video.localizations, {language_id: languageId});
        if (!localization.writing_questions) {
            localization.writing_questions = [];
        }
        localization.writing_questions.push({text: '', example_answer: ''});
    }

    private handleCreateSuccess(id: number) {
        if (id) {
            window.alert('Video created successfully.');
            this.router.navigate(['videos', id, 'edit']);
        } else {
            window.alert('Video created successfully; however, no ID was returned from the API.');
        }
    }

    private async handleError(e: APIError[]) {
        return window.alert(_.get(_.first(e), 'message', 'An unexpected error has occurred. Check console for details.'));
    }
}
