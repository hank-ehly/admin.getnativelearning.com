import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../speaker.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

interface Language {
    id: number
    code: string
    name: string
}

interface SpeakerLocalization {
    language: Language
    name?: string
    description?: string
    location?: string
}

interface Speaker {
    gender?: Gender
    pictureUrl?: string
    localizations?: SpeakerLocalization[]
}

interface Gender {
    id?: number
    name?: string
}

@Component({
    selector: 'gn-speaker-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SpeakerFormComponent implements OnInit, OnDestroy {
    genders: Gender[];
    subscriptions: Subscription[] = [];
    @Input() speaker: Speaker;

    constructor(private lang: LanguagesService, private speakerService: SpeakerService) {
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
