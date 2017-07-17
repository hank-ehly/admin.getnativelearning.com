import { Component, OnDestroy, OnInit } from '@angular/core';

import { LanguagesService } from '../../core/languages.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { CategoriesService } from '../../categories/categories.service';
import { VideoService } from '../video.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'gn-index-video',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexVideoComponent implements OnInit, OnDestroy {
    languages = [];
    categories = [];
    maxId: number;

    subcategoryIdEmitted$: Observable<number>;
    private emitSubcategoryId$: BehaviorSubject<number>;

    languageCodeEmitted$: Observable<string>;
    private emitLanguageCode$: BehaviorSubject<string>;

    maxIdEmitted$: Observable<number>;
    private emitMaxId$: BehaviorSubject<number>;

    loadMoreVideosEmitted$: Observable<number>;
    private emitLoadMoreVideos$: BehaviorSubject<number>;

    qEmitted$: Observable<string>;
    private emitQ$: BehaviorSubject<string>;

    videosEmitted$: Observable<any>;
    private emitVideos$: Subject<any>;
    loading$ = new BehaviorSubject<boolean>(false);

    private subscriptions: Subscription[] = [];

    constructor(private langService: LanguagesService, private categoryService: CategoriesService, private videoService: VideoService) {
        this.emitLoadMoreVideos$ = new BehaviorSubject<number>(null);
        this.loadMoreVideosEmitted$ = this.emitLoadMoreVideos$.asObservable();

        this.emitLanguageCode$ = new BehaviorSubject<string>('');
        this.languageCodeEmitted$ = this.emitLanguageCode$.asObservable().distinctUntilChanged();

        this.emitMaxId$ = new BehaviorSubject<number>(null);
        this.maxIdEmitted$ = this.emitMaxId$.asObservable().distinctUntilChanged();

        this.emitSubcategoryId$ = new BehaviorSubject<number>(null);
        this.subcategoryIdEmitted$ = this.emitSubcategoryId$.asObservable().distinctUntilChanged();

        this.emitQ$ = new BehaviorSubject<string>('');
        this.qEmitted$ = this.emitQ$.asObservable().map(v => _.trim(v)).distinctUntilChanged().debounceTime(300);

        this.emitVideos$ = new BehaviorSubject<any>(null);
        this.videosEmitted$ = this.emitVideos$.asObservable()
            .combineLatest(this.qEmitted$, this.subcategoryIdEmitted$, this.languageCodeEmitted$, this.maxIdEmitted$)
            .switchMap(([x, query, subcategoryId, languageCode]: [any, string, number, string]) => {
                return this.loadMoreVideosEmitted$.startWith(null).distinctUntilChanged().do(() => {
                    this.loading$.next(true);
                }).concatMap((maxId?: number) => {
                    return this.videoService.getVideos({q: query, subcategory_id: subcategoryId, lang: languageCode});
                }).do(this.updateMaxVideoId.bind(this)).scan(this.concatVideos, []).do(() => {
                    this.loading$.next(false);
                });
            });
    }

    ngOnInit() {
        this.subscriptions.push(
            this.langService.getLanguages().subscribe(languages => this.languages = languages, this.handleError),
            this.categoryService.getCategories().subscribe(categories => this.categories = categories, this.handleError)
        );
    }

    ngOnDestroy(): void {
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onClickLoadMore(): void {
        this.emitLoadMoreVideos$.next(this.maxId)
    }

    onInputQ(value: string) {
        this.emitQ$.next(value);
    }

    onLanguageChange(e: Event) {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>_.first(target.selectedOptions);
        this.emitLanguageCode$.next(selectedOption.value);
    }

    onSubcategoryIdChange(e: Event) {
        const target = <HTMLSelectElement>e.target;
        const selectedOption = <HTMLOptionElement>_.first(target.selectedOptions);
        this.emitSubcategoryId$.next(_.toNumber(selectedOption.value));
    }

    private updateMaxVideoId(records?: any[]): void {
        if (!_.isEmpty(records)) {
            this.maxId = _.minBy(records, 'id').id;
        }
    }

    private async handleError(e: Response) {
        if (_.isArray(e)) {
            return window.alert(_.get(_.first(await e.json()), 'message', 'An unexpected error has occurred. Check console for details.'));
        }
    }

    private concatVideos(acc: any[], records: any[]) {
        return records ? _.unionWith(acc, records, _.isEqual) : [];
    }
}
