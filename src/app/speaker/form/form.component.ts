import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SpeakerService } from '../speaker.service';
import { Speaker } from '../../models/speaker';
import { Gender } from '../../models/gender';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
    selector: 'gn-speaker-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SpeakerFormComponent implements OnInit, OnDestroy {
    @Input() speaker: Speaker;
    genders: Gender[];
    subscriptions: Subscription[] = [];

    constructor(private speakerService: SpeakerService, private router: Router) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.speakerService.getGenders().subscribe((genders: Gender[]) => this.genders = genders)
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSubmit(): void {
        const body = {
            gender_id: this.speaker.gender.id,
            localizations: []
        };

        for (const localization of this.speaker.localizations) {
            const index = body.localizations.push({
                language_id: localization.language.id,
                description: localization.description,
                location: localization.location,
                name: localization.name
            });

            if (_.has(localization, 'id')) {
                body.localizations[index - 1].id = localization['id'];
            }
        }

        let subscription;
        if (_.has(this.speaker, 'id')) {
            subscription = this.speakerService.updateSpeaker(this.speaker.id, body).subscribe(null, this.handleError);
        } else {
            subscription = this.speakerService.createSpeaker(body).subscribe(this.handleCreatedSpeaker.bind(this), this.handleError);
        }

        this.subscriptions.push(subscription);
    }

    private handleCreatedSpeaker(res: any) {
        if (res && res.id) {
            this.router.navigate(['speakers', res.id, 'edit']);
        }
    }

    private async handleError(e: Response) {
        window.alert(_.get(_.first(await e.json()), 'message', 'error'));
    }
}
