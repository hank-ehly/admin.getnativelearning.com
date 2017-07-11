import { Component, OnInit } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';

@Component({
    selector: 'gn-edit-collocation',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditCollocationComponent implements OnInit {
    collocation: CollocationOccurrence = {
        id: 1,
        text: 'funny thing',
        ipa_spelling: 'ˈfʌni θɪŋ',
        usage_examples: {
            records: [{
                id: 5,
                text: 'usage example 5'
            }, {
                id: 6,
                text: 'usage example 6'
            }],
            count: 2
        }
    };

    constructor() {
    }

    ngOnInit() {
    }
}
