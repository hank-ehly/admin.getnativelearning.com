import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EditSubcategoryComponent } from './edit-subcategory.component';
import { CategoriesService } from '../categories.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterStub } from '../../testing/router-stub';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

describe('EditSubcategoryComponent', () => {
    const mockSubcategory = {
        id: 456,
        name: 'subcategory 1',
        created_at: 'Wed Jan 11 04:35:55 +0000 2017',
        updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
    };

    const mockCategories = {
        records: [
            {
                id: 1,
                name: 'Category 1'
            },
            {
                id: 2,
                name: 'Category 2'
            }
        ],
        count: 2
    };

    let component: EditSubcategoryComponent;
    let fixture: ComponentFixture<EditSubcategoryComponent>;
    const currentCategoryId = 2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule,
                SharedModule
            ],
            declarations: [
                EditSubcategoryComponent
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: {
                                category_id: currentCategoryId,
                                subcategory_id: 2
                            }
                        }
                    }
                },
                {provide: Router, useClass: RouterStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditSubcategoryComponent);
        component = fixture.componentInstance;
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'getSubcategory').and.returnValue(Observable.of(mockSubcategory));
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'getCategories').and.returnValue(Observable.of(mockCategories.records));
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display the subcategory name in the input field', (done) => {
        const inputField = fixture.debugElement.query(By.css('.subcategory__name')).nativeElement;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputField.value).toEqual(mockSubcategory.name);
            done();
        });
    });

    it('should display the subcategory creation DateTime', () => {
        const createdAtEl = fixture.debugElement.query(By.css('.subcategory__created-at')).nativeElement;
        expect(createdAtEl.textContent).toContain(mockSubcategory.created_at);
    });

    it('should display the subcategory update DateTime', () => {
        const updatedAtEl = fixture.debugElement.query(By.css('.subcategory__updated-at')).nativeElement;
        expect(updatedAtEl.textContent).toContain(mockSubcategory.updated_at);
    });

    it('should display a list of category names in a dropdown', () => {
        const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
        expect(selectEl.options.length).toEqual(mockCategories.count);
    });

    it('should preselect the category with the id that corresponds to the current category id', () => {
        const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
        expect(selectEl.selectedIndex).toEqual(_.findIndex(mockCategories.records, {id: currentCategoryId}));
    });
});
