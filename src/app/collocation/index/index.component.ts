import { Component, OnInit } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';

@Component({
    selector: 'gn-collocation-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexCollocationComponent implements OnInit {
    collocations: CollocationOccurrence[] = [
        {
            id: 1,
            text: 'funny thing',
            ipa_spelling: 'ˈfʌni θɪŋ',
            usage_examples: {
                records: [],
                count: 2
            }
        }
    ];

    constructor() {
    }

    ngOnInit() {
        console.log('***');
    }

}
