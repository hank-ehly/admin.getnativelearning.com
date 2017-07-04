import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gn-index-speaker',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexSpeakerComponent implements OnInit {
    speakers: any[];

    constructor() {
    }

    ngOnInit() {
    }

}
