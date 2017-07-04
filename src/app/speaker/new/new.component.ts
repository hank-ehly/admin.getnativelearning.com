import { Component, OnDestroy, OnInit } from '@angular/core';

import { Speaker } from '../../models/speaker';
import { LanguagesService } from '../../core/languages.service';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

@Component({
    selector: 'gn-new-speaker',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewSpeakerComponent implements OnInit, OnDestroy {
    speaker: Speaker;
    private subscriptions: Subscription[] = [];

    constructor(private lang: LanguagesService) {
        this.speaker = {
            gender: {
                id: null
            },
            pictureUrl: '',
            localizations: []
        }
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.lang.getLanguages().subscribe(languages => {
                for (const language of languages) {
                    this.speaker.localizations.push({
                        language: language,
                        description: '',
                        location: '',
                        name: ''
                    });
                }
            })
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }
}
