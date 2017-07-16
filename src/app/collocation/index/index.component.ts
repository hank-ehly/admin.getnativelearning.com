import { Component, OnDestroy } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';
import { CollocationService } from '../collocation.service';

import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'gn-collocation-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexCollocationComponent implements OnDestroy {
    collocations: CollocationOccurrence[] = [];
    videoId: number;
    subscriptions: Subscription[] = [];

    constructor(private collocationService: CollocationService) {
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSubmit(): void {
        this.subscriptions.push(
            this.collocationService.getCollocationOccurrencesForVideoId(this.videoId).subscribe(collocations => {
                this.collocations = collocations;
            }, async (e: Response) => {
                this.collocations = [];
                window.alert(_.get(_.first(await e.json()), 'message', 'An unexpected error has occurred. Check console for details.'));
            })
        );
    }
}
