import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { SpeakerService } from '../speaker.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/concatMap';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-speaker',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditSpeakerComponent implements OnInit, OnDestroy {
    speaker: any;
    picture: any;
    pictureFileObj: File;
    private subscriptions: Subscription[] = [];

    constructor(private speakerService: SpeakerService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.speakerService.getSpeaker(this.route.snapshot.params['id']).concatMap(speaker => {
            this.speaker = _.pick(_.mapKeys(speaker, (v, k: string) => _.camelCase(k)), ['id', 'pictureUrl', 'gender.id']);
            return this.speakerService.getSpeakerLocalizations(this.route.snapshot.params['id']);
        }).subscribe(localizations => {
            _.set(this.speaker, 'localizations', localizations);
        });
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onPictureChange(e: any): void {
        const inputElement: HTMLInputElement = <HTMLInputElement>e.target;
        this.pictureFileObj = _.first(inputElement.files);
        this.speaker.pictureUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.pictureFileObj));
    }

    onSubmit(): void {
        console.log(this.pictureFileObj);
        this.subscriptions.push(
            this.speakerService.uploadSpeakerPicture(this.speaker.id, this.pictureFileObj)
                .subscribe(this.handleUploadSuccess.bind(this), this.handleError)
        );
    }

    private handleUploadSuccess(res: any): void {
        if (res && _.isString(res.picture_url)) {
            console.log(this.speaker);
            this.speaker.pictureUrl = res.picture_url;
        }
    }

    private async handleError(e: Response) {
        return window.alert(_.get(_.first(await e.json()), 'message', 'error'));
    }
}
