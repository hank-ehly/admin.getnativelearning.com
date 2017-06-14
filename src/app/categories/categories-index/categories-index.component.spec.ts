import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CategoriesIndexComponent } from './categories-index.component';
import { CategoriesService } from '../categories.service';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';
import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';

let comp: CategoriesIndexComponent;
let fixture: ComponentFixture<CategoriesIndexComponent>;
let page: Page;

describe('CategoriesIndexComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CategoriesIndexComponent
            ],
            imports: [
                HttpModule,
                RouterTestingModule
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        expect(comp).toBeTruthy();
    });

    it('should display a list of categories', () => {
        expect(page.categoryIds.length).toEqual(MockApiResponse_CategoriesIndex.count);
    });

    it('should display the id of the category', () => {
        expect(_.first(page.categoryIds).textContent).toEqual(_.first(MockApiResponse_CategoriesIndex.records).id.toString());
    });

    it('should display the name of the category', () => {
        expect(_.first(page.categoryNames).textContent).toEqual(_.first(MockApiResponse_CategoriesIndex.records).name.toString());
    });

    it('should display the number of subcategories', () => {
        expect(+_.first(page.subcategoryCounts).textContent).toEqual(_.first(MockApiResponse_CategoriesIndex.records).subcategories.count);
    });

    it('should set the title of the delete button', () => {
        expect(_.first(page.deleteButtons).getAttribute('title')).toEqual(comp.deleteButtonTitle);
    });

    it('should disable the delete button if the category has subcategories', () => {
        expect(_.first(page.deleteButtons).disabled).toBe(true);
    });

    it('should enable the delete button if the category has no subcategories', () => {
        expect(_.nth(page.deleteButtons, 3).disabled).toBe(false);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(CategoriesIndexComponent);
    comp = fixture.componentInstance;

    const categoriesService = fixture.debugElement.injector.get(CategoriesService);
    spyOn(categoriesService, 'getCategories').and.returnValue(Observable.of(MockApiResponse_CategoriesIndex.records));

    fixture.detectChanges();

    page = new Page();
    page.refreshPageElements();

    return fixture.whenStable();
}

class Page {
    firstCategoryDebugEl: DebugElement;

    categoryIds: HTMLTableDataCellElement[];
    categoryNames: HTMLTableDataCellElement[];
    subcategoryCounts: HTMLTableDataCellElement[];
    deleteButtons: HTMLButtonElement[];

    refreshPageElements() {
        this.categoryIds = fixture.debugElement.queryAll(By.css('.category__id')).map(e => e.nativeElement);
        this.categoryNames = fixture.debugElement.queryAll(By.css('.category__name')).map(e => e.nativeElement);
        this.subcategoryCounts = fixture.debugElement.queryAll(By.css('.category__subcategories-count')).map(e => e.nativeElement);
        this.deleteButtons = fixture.debugElement.queryAll(By.css('.category__action--delete')).map(e => e.nativeElement);
    }
}
