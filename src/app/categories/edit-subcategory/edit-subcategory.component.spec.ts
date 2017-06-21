import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { MockApiResponse_SubcategoriesShow } from '../../testing/mock-api-responses/subcategories-show';
import { EditSubcategoryComponent } from './edit-subcategory.component';
import { CategoriesService } from '../categories.service';
import { RouterStub } from '../../testing/router-stub';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { click } from '../../testing/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

let fixture: ComponentFixture<EditSubcategoryComponent>;
let comp: EditSubcategoryComponent;
let page: Page;

describe('EditSubcategoryComponent', () => {
    beforeEach(async(() => {
        const ActivatedRouteStubProvider = {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    params: {
                        category_id: _.first(MockApiResponse_CategoriesIndex.records).id,
                        subcategory_id: MockApiResponse_SubcategoriesShow.id
                    }
                }
            }
        };

        const RouterStubProvider = {
            provide: Router, useClass: RouterStub
        };

        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule
            ],
            declarations: [
                EditSubcategoryComponent
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService,
                ActivatedRouteStubProvider,
                RouterStubProvider
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        expect(comp).toBeTruthy();
    });

    it('should show an input for each subcategory name', () => {
        expect(page.nameInputs.length).toEqual(page.showSubcategoryResponse.subcategories_localized.count);
    });

    it('should display subcategory names in the appropriate text input field', () => {
        expect(_.first(page.nameInputs).value).toEqual(_.first(page.showSubcategoryResponse.subcategories_localized.records)['name']);
    });

    it('should disable editing of category names by default', () => {
        expect(_.first(page.nameInputs).readOnly).toEqual(true);
    });

    it('should hide the commit icon by default', () => {
        expect(page.commitIcons.length).toEqual(0);
    });

    it('should hide the cancel icon by default', () => {
        expect(page.cancelIcons.length).toEqual(0);
    });

    it('should display the commit icon after pressing the edit button', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();
        page.refreshPageElements();
        expect(_.first(page.commitIcons)).toBeTruthy();
    });

    it('should display the cancel icon after pressing the edit button', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();
        page.refreshPageElements();
        expect(_.first(page.cancelIcons)).toBeTruthy();
    });

    it('should enable editing on the name input whose edit button is pressed', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();
        expect(_.first(page.nameInputs).readOnly).toEqual(false);
    });

    it('should disable the input field whose X icon is pressed', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();
        expect(_.first(page.nameInputs).readOnly).toEqual(false);

        page.refreshPageElements();

        click(_.first(page.cancelIcons));
        fixture.detectChanges();

        expect(_.first(page.nameInputs).readOnly).toEqual(true);
    });

    it('should disable the input field whose √ icon is pressed', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();
        expect(_.first(page.nameInputs).readOnly).toEqual(false);

        page.refreshPageElements();

        click(_.first(page.commitIcons));
        fixture.detectChanges();

        expect(_.first(page.nameInputs).readOnly).toEqual(true);
    });

    it('should reset the subcategory name to its original value after pressing the X icon', () => {
        const originalValue = _.first(page.showSubcategoryResponse.subcategories_localized.records)['name'];

        click(_.first(page.editButtons));
        fixture.detectChanges();

        _.first(comp.subcategory.subcategories_localized.records)['name'] = 'new value';
        fixture.detectChanges();

        page.refreshPageElements();

        click(_.first(page.cancelIcons));
        fixture.detectChanges();

        expect(_.first(comp.subcategory.subcategories_localized.records)['name']).toEqual(originalValue);
    });

    it('should add the index of the clicked check mark to the updating index set', () => {
        click(_.first(page.editButtons));
        fixture.detectChanges();

        _.first(comp.subcategory.subcategories_localized.records)['name'] = 'new value';
        fixture.detectChanges();

        page.refreshPageElements();

        click(_.first(page.commitIcons));
        fixture.detectChanges();

        expect(comp.updatingIndices).toContain(0);
    });

    it('should reset an edited subcategory name to its original value if the update request fails', () => {
        const index = 1;
        const originalValue = _.nth(page.showSubcategoryResponse.subcategories_localized.records, index)['name'];
        const service = fixture.debugElement.injector.get(CategoriesService);

        spyOn(service, 'updateSubcategoryLocalized').and.returnValue(Observable.of(false));

        click(_.nth(page.editButtons, index));
        fixture.detectChanges();

        _.nth(comp.subcategory.subcategories_localized.records, index)['name'] = 'new value';
        fixture.detectChanges();

        page.refreshPageElements();

        click(_.first(page.commitIcons));
        fixture.detectChanges();

        expect(_.nth(comp.subcategory.subcategories_localized.records, index)['name']).toEqual(originalValue);
    });

    it('should update the name of the persistedSubcategory after a successful update', () => {
        const newValue = 'new value';
        const service = fixture.debugElement.injector.get(CategoriesService);

        spyOn(service, 'updateSubcategoryLocalized').and.returnValue(Observable.of(true));

        click(_.first(page.editButtons));
        fixture.detectChanges();

        _.first(comp.subcategory.subcategories_localized.records)['name'] = newValue;
        fixture.detectChanges();

        page.refreshPageElements();

        click(_.first(page.commitIcons));
        fixture.detectChanges();

        expect(_.first(comp.persistedSubcategory.subcategories_localized.records)['name']).toEqual(newValue);
    });

    // Works when you test alone
    it('should display a dropdown list of categories', () => {
        expect(page.selectEl.options.length).toEqual(page.indexCategoriesResponse.records.length);
    });

    it('should set the persistedCategory when the categories are first retrieved', () => {
        expect(comp.persistedCategoryId).toEqual(page.showSubcategoryResponse.category.id);
    });

    it('should set the selectedCategoryId when a category is selected', () => {
        const selectedIndex = 2;
        page.selectCategoryAtIndex(selectedIndex);
        const expectedCategoryId = _.nth(page.indexCategoriesResponse.records, selectedIndex)['id'];
        expect(comp.selectedCategoryId).toEqual(expectedCategoryId);
    });

    it('should disable the category submit button by default', () => {
        expect(page.categorySubmitButton.disabled).toEqual(true);
    });

    it('should enable the category submit button when the persistedCategory and selectedCategory are not equal', () => {
        page.selectCategoryAtIndex(3);
        expect(page.categorySubmitButton.disabled).toBe(false);
    });

    it('should set the category to its original value if the category update request fails', () => {
        const index = 1;
        const service = fixture.debugElement.injector.get(CategoriesService);

        spyOn(service, 'updateSubcategory').and.returnValue(Observable.of(false));

        page.selectCategoryAtIndex(index);
        expect(comp.selectedCategoryId).not.toEqual(comp.persistedCategoryId);

        click(page.categorySubmitButton);
        fixture.detectChanges();

        expect(comp.selectedCategoryId).toEqual(comp.persistedCategoryId);
    });

    it('should update the persistedCategoryId when the update request succeeds', () => {
        const service = fixture.debugElement.injector.get(CategoriesService);
        spyOn(service, 'updateSubcategory').and.returnValue(Observable.of(true));

        page.selectCategoryAtIndex(3);
        click(page.categorySubmitButton);
        fixture.detectChanges();

        expect(comp.persistedCategoryId).toEqual(comp.selectedCategoryId);
    });

    it('should hide the category update submit button spinner by default', () => {
        expect(fixture.debugElement.query(By.css('.categories__submit-loading-spinner'))).toBeFalsy();
    });
});

function createComponent() {
    fixture = TestBed.createComponent(EditSubcategoryComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    nameInputs: HTMLInputElement[];
    commitIcons: HTMLElement[];
    cancelIcons: HTMLElement[];
    editButtons: HTMLButtonElement[];
    selectEl: HTMLSelectElement;
    categorySubmitButton: HTMLButtonElement;
    showSubcategoryResponse: any;
    indexCategoriesResponse: any;

    constructor() {
        this.showSubcategoryResponse = MockApiResponse_SubcategoriesShow;
        this.indexCategoriesResponse = MockApiResponse_CategoriesIndex;
        const categoriesService = fixture.debugElement.injector.get(CategoriesService);
        spyOn(categoriesService, 'getSubcategory').and.returnValue(Observable.of(this.showSubcategoryResponse));
        spyOn(categoriesService, 'getCategories').and.returnValue(Observable.of(this.indexCategoriesResponse.records));
    }

    refreshPageElements() {
        this.nameInputs = fixture.debugElement.queryAll(By.css('.subcategory__name')).map(de => de.nativeElement);
        this.commitIcons = fixture.debugElement.queryAll(By.css('.subcategory__action--commit')).map(de => de.nativeElement);
        this.cancelIcons = fixture.debugElement.queryAll(By.css('.subcategory__action--cancel')).map(de => de.nativeElement);
        this.editButtons = fixture.debugElement.queryAll(By.css('.subcategory__action--edit')).map(de => de.nativeElement);
        this.selectEl = fixture.debugElement.query(By.css('select.categories')).nativeElement;
        this.categorySubmitButton = fixture.debugElement.query(By.css('button.categories__submit-button')).nativeElement;
    }

    selectCategoryAtIndex(i: number) {
        this.selectEl.selectedIndex = i;
        this.selectEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }
}
