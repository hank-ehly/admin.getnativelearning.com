import { Component, Input, OnDestroy } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';
import { CollocationService } from '../collocation.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'gn-collocation-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class CollocationFormComponent implements OnDestroy {
    @Input() set collocation(value: CollocationOccurrence) {
        if (value) {
            this.model = value;
        }
    };

    model: CollocationOccurrence = {
        text: '',
        ipa_spelling: ''
    };

    private subscriptions: Subscription[] = [];

    constructor(private collocationService: CollocationService, private route: ActivatedRoute) {
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    addUsageExample(): void {
        this.model.usage_examples.records.push({text: ''});
        this.model.usage_examples.count++;
    }

    onSubmitCollocationForm(): void {
        const body = _.pick(this.model, ['ipa_spelling']);
        const id = this.route.snapshot.params.id;
        this.subscriptions.push(
            this.collocationService.updateCollocationOccurrence(id, body).subscribe(null, async (e: Response) => {
                window.alert(_.get(_.first(await e.json()), 'message', 'error'));
            })
        );
    }

    onSubmitUsageExampleAtIndex(i: number): void {
        let subscription;
        const body = {text: this.model.usage_examples.records[i].text};
        if (_.has(this.model.usage_examples.records[i], 'id')) {
            const id = _.get<number>(this.model.usage_examples.records[i], 'id');
            subscription = this.collocationService.updateUsageExample(id, body).subscribe(null, async (e: Response) => {
                window.alert(_.get(_.first(await e.json()), 'message', 'error'));
            });
        } else {
            const id = this.route.snapshot.params.id;
            subscription = this.collocationService.createUsageExample(id, body).subscribe(example => {
                if (example) {
                    this.model.usage_examples.records[i] = example;
                }
            }, async (e: Response) => {
                window.alert(_.get(_.first(await e.json()), 'message', 'error'));
            });
        }
        this.subscriptions.push(subscription);
    }

    onDeleteUsageExampleAtIndex(i: number): void {
        if (!_.has(this.model.usage_examples.records[i], 'id')) {
            this.model.usage_examples.records.splice(i, 1);
            this.model.usage_examples.count--;
        }
    }
}
