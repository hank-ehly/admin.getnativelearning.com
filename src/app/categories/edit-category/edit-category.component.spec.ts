import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EditCategoryComponent } from './edit-category.component';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

describe('EditCategoryComponent', () => {
    const mockCategory = {
        id: 123,
        name: 'category 1',
        created_at: 'Wed Jan 11 04:35:55 +0000 2017',
        updated_at: 'Wed Jan 11 04:35:55 +0000 2017',
        subcategories: {
            records: [
                {
                    id: 456,
                    name: 'subcategory 1',
                    created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                    updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
                },
                {
                    id: 789,
                    name: 'subcategory 2',
                    created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                    updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
                }
            ],
            count: 2
        }
    };

    let component: EditCategoryComponent;
    let fixture: ComponentFixture<EditCategoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                FormsModule
            ],
            declarations: [
                EditCategoryComponent
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditCategoryComponent);
        component = fixture.componentInstance;
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'getCategory').and.returnValue(Observable.of(mockCategory));
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display the category name in the input field', (done) => {
        const inputField = fixture.debugElement.query(By.css('.category__name')).nativeElement;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputField.value).toEqual(mockCategory.name);
            done();
        });
    });

    it('should display the category creation DateTime', () => {
        const createdAtEl = fixture.debugElement.query(By.css('.category__created-at')).nativeElement;
        expect(createdAtEl.textContent).toContain(mockCategory.created_at);
    });

    it('should display the category update DateTime', () => {
        const updatedAtEl = fixture.debugElement.query(By.css('.category__updated-at')).nativeElement;
        expect(updatedAtEl.textContent).toContain(mockCategory.updated_at);
    });

    it('should display a list of subcategories', async () => {
        const subcategoriesEl = fixture.debugElement.queryAll(By.css('.subcategory'));
        expect(subcategoriesEl.length).toEqual(mockCategory.subcategories.count);
    });

    it('should display the subcategory id', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__id')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(mockCategory.subcategories.records).id.toString());
    });

    it('should display the subcategory name', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__name')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(mockCategory.subcategories.records).name.toString());
    });

    it('should display the subcategory creation DateTime', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__created-at')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(mockCategory.subcategories.records).created_at);
    });

    it('should display the subcategory update DateTime', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__updated-at')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(mockCategory.subcategories.records).updated_at);
    });

    it('should show a success alert after successful category update', () => {
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'updateCategory').and.returnValue(Observable.of(true));
        fixture.debugElement.query(By.css('#name')).nativeElement.value = 'new name';
        fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
        fixture.detectChanges();
        const alertEl = fixture.debugElement.query(By.css('div.alert.alert-success')).nativeElement;
        expect(alertEl).toBeTruthy();
    });

    it('should show a danger alert after failed category update', () => {
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'updateCategory').and.returnValue(Observable.of(false));
        fixture.debugElement.query(By.css('#name')).nativeElement.value = 'new name';
        fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
        fixture.detectChanges();
        const alertEl = fixture.debugElement.query(By.css('div.alert.alert-danger')).nativeElement;
        expect(alertEl).toBeTruthy();
    });

    it('should disable the submit button if the value is unchanged', () => {
        const originalCategoryName = component.categoryName;
        fixture.debugElement.query(By.css('#name')).triggerEventHandler('input', {target: {value: '12345678'}});
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#name')).triggerEventHandler('input', {target: {value: originalCategoryName}});
        fixture.detectChanges();
        expect(component.categoryNameSubmitDisabled).toBeTruthy();
    });

    it('should enable the submit button if the category name value has changed', () => {
        fixture.debugElement.query(By.css('#name')).triggerEventHandler('input', {target: {value: '12345678'}});
        fixture.detectChanges();
        expect(component.categoryNameSubmitDisabled).toBeFalsy();
    });
});
