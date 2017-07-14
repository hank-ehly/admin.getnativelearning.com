import { Component, OnDestroy, OnInit } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';
import { CollocationService } from '../collocation.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'gn-edit-collocation',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditCollocationComponent implements OnInit, OnDestroy {
    collocation: CollocationOccurrence;
    private subscriptions: Subscription[] = [];

    constructor(private collocationService: CollocationService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.collocationService.getCollocationOccurrenceById(this.route.snapshot.params.id).subscribe(collocation => {
                this.collocation = collocation;
            }, async (e: Response) => {
                window.alert(_.get(_.first(await e.json()), 'message', 'error'));
                window.history.back();
            })
        )
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }
}
