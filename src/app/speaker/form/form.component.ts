import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SpeakerService } from '../speaker.service';
import { Speaker } from '../../models/speaker';
import { Gender } from '../../models/gender';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-speaker-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SpeakerFormComponent implements OnInit, OnDestroy {
    genders: Gender[];
    subscriptions: Subscription[] = [];
    @Input() speaker: Speaker;

    constructor(private speakerService: SpeakerService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.speakerService.getGenders().subscribe((genders: Gender[]) => this.genders = genders)
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
