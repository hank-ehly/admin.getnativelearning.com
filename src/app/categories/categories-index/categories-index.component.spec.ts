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

describe('CategoriesIndexComponent', () => {
    const mockCategories = {
        records: [{
            id: 123,
            name: 'category 1',
            subcategories: {
                records: [{name: 'subcategory 2'}],
                count: 1
            }
        }, {
            id: 456,
            name: 'category 2',
            subcategories: {
                records: [],
                count: 0
            }
        }],
        count: 2
    };

    let component: CategoriesIndexComponent;
    let fixture: ComponentFixture<CategoriesIndexComponent>;
    let firstCategoryDebugEl: DebugElement;

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
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesIndexComponent);
        component = fixture.componentInstance;
        const categoriesService = fixture.debugElement.injector.get(CategoriesService);
        const spy = spyOn(categoriesService, 'getCategories').and.returnValue(Observable.of(mockCategories.records));
        fixture.detectChanges();
        firstCategoryDebugEl = _.first(fixture.debugElement.queryAll(By.css('.category')));
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display a list of categories', () => {
        expect(fixture.debugElement.queryAll(By.css('.category')).length).toEqual(mockCategories.count);
    });

    it('should display the id of the category', () => {
        const categoryIdEl = firstCategoryDebugEl.query(By.css('.category__id')).nativeElement;
        expect(categoryIdEl.textContent).toEqual(_.first(mockCategories.records).id.toString());
    });

    it('should display the name of the category', () => {
        const categoryNameEl = firstCategoryDebugEl.query(By.css('.category__name')).nativeElement;
        expect(categoryNameEl.textContent).toEqual(_.first(mockCategories.records).name.toString());
    });

    it('should display the number of subcategories', () => {
        const subcategoriesCountEl = firstCategoryDebugEl.query(By.css('.category__subcategories-count')).nativeElement;
        expect(subcategoriesCountEl.textContent).toEqual(_.first(mockCategories.records).subcategories.count.toString());
    });

    it('should set the title of the delete button', () => {
        const deleteButton = firstCategoryDebugEl.query(By.css('.category__action--delete')).nativeElement;
        expect(deleteButton.getAttribute('title')).toEqual(component.deleteButtonTitle);
    });

    it('should disable the delete button if the category has subcategories', () => {
        const deleteButton = firstCategoryDebugEl.query(By.css('.category__action--delete')).nativeElement;
        expect(deleteButton.disabled).toBe(true);
    });

    it('should enable the delete button if the category has no subcategories', () => {
        const deleteButton = _.nth(fixture.debugElement.queryAll(By.css('.category')), 1)
            .query(By.css('.category__action--delete')).nativeElement;
        expect(deleteButton.disabled).toBe(false);
    });
});
