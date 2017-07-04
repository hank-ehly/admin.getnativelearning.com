import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpeakerService } from '../speaker.service';

import 'rxjs/add/operator/concatMap';
import * as _ from 'lodash';

@Component({
    selector: 'gn-edit-speaker',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditSpeakerComponent implements OnInit {
    speaker: any;

    constructor(private speakerService: SpeakerService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.speakerService.getSpeaker(this.route.snapshot.params['id']).concatMap(speaker => {
            this.speaker = _.pick(_.mapKeys(speaker, (v, k: string) => _.camelCase(k)), ['id', 'pictureUrl', 'gender.id']);
            return this.speakerService.getSpeakerLocalizations(this.route.snapshot.params['id']);
        }).subscribe(localizations => {
            _.set(this.speaker, 'localizations', localizations);
        });
    }
}
