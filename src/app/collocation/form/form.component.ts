import { Component, Input, OnDestroy } from '@angular/core';

import { CollocationOccurrence } from '../../models/collocation-occurrence';
import { CollocationService } from '../collocation.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { APIError } from '../../core/api-error';

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
        const id = this.route.snapshot.params['id'];
        const subscription = this.collocationService.updateCollocationOccurrence(id, body).subscribe(() => {
            window.alert('CollocationOccurrence was updated successfully.');
        }, this.errorResponse.bind(this));
        this.subscriptions.push(subscription);
    }

    onSubmitUsageExampleAtIndex(i: number): void {
        let subscription;
        const body = {text: this.model.usage_examples.records[i].text};
        if (_.has(this.model.usage_examples.records[i], 'id')) {
            const id = +_.get(this.model.usage_examples.records[i], 'id');
            subscription = this.collocationService.updateUsageExample(id, body).subscribe(() => {
                window.alert('Usage example updated successfully.');
            }, this.errorResponse.bind(this));
        } else {
            const id = this.route.snapshot.params['id'];
            subscription = this.collocationService.createUsageExample(id, body).subscribe(example => {
                if (example) {
                    this.model.usage_examples.records[i] = example;
                    window.alert('Usage example created successfully.');
                } else {
                    window.alert('Usage example creation request succeeded, but no usage example record was returned from API.');
                }
            }, this.errorResponse.bind(this));
        }
        this.subscriptions.push(subscription);
    }

    onDeleteUsageExampleAtIndex(i: number): void {
        if (!_.has(this.model.usage_examples.records[i], 'id')) {
            return this.removeUsageExampleAtIndex(i);
        }
        if (!window.confirm('Press OK to delete usage example.')) {
            return;
        }

        const subscription = this.collocationService.deleteUsageExample(this.model.usage_examples.records[i].id)
            .subscribe(this.removeUsageExampleAtIndex.bind(this, i), this.errorResponse.bind(this));

        this.subscriptions.push(subscription);
    }

    private removeUsageExampleAtIndex(i: number): void {
        this.model.usage_examples.records.splice(i, 1);
        this.model.usage_examples.count--;
    }

    private async errorResponse(e: APIError[]) {
        window.alert(_.get(_.first(e), 'message', 'error'));
    }
}
