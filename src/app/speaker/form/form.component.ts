import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguagesService } from '../../core/languages.service';
import { SpeakerService } from '../speaker.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

interface SpeakerLocalization {
    languageId?: number
    name?: string
    description?: string
    location?: string
}

interface Speaker {
    genderId: number
    localizations: SpeakerLocalization[]
}

interface Gender {
    id: number
    name: string
}

@Component({
    selector: 'gn-speaker-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SpeakerFormComponent implements OnInit, OnDestroy {
    genders: Gender[];
    subscriptions: Subscription[] = [];
    speaker: Speaker = {
        genderId: null,
        localizations: []
    };

    constructor(private lang: LanguagesService, private speakerService: SpeakerService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.lang.getLanguages().subscribe(languages => {
                for (const language of languages) {
                    this.speaker.localizations.push({
                        languageId: language.id,
                        name: null,
                        description: null,
                        location: null
                    });
                }
            }),
            this.speakerService.getGenders().subscribe((genders: Gender[]) => this.genders = genders)
        );
    }

    ngOnDestroy(): void {
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
