import { Component, Input, OnInit } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';

@Component({
    selector: 'gn-collocation-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class CollocationFormComponent implements OnInit {
    @Input() collocation: CollocationOccurrence;

    constructor() {
    }

    ngOnInit() {
    }

    addUsageExample(): void {
        this.collocation.usage_examples.records.push({
            text: ''
        });
        this.collocation.usage_examples.count++;
    }
}
