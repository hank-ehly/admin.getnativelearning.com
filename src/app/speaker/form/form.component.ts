import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../../core/languages.service';

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

@Component({
    selector: 'gn-speaker-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class SpeakerFormComponent implements OnInit {
    speaker: Speaker = {
        genderId: null,
        localizations: []
    };

    constructor(private lang: LanguagesService) {
    }

    ngOnInit() {
        this.lang.getLanguages().subscribe(languages => {
            for (const language of languages) {
                this.speaker.localizations.push({
                    languageId: language.id,
                    name: null,
                    description: null,
                    location: null
                });
            }
        });
    }
}
