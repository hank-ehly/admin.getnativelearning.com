import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SpeakerService } from '../speaker.service';

import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'gn-index-speaker',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexSpeakerComponent implements OnInit, OnDestroy {
    speakers: any[];

    private subscriptions: Subscription[] = [];

    constructor(private speakerService: SpeakerService, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.speakerService.getSpeakers().subscribe(speakers => {
                this.speakers = _.sortBy(speakers, ['name', 'location']);
            })
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }
}
