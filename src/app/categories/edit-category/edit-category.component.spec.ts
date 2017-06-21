import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MockApiResponse_SubcategoriesCreate } from '../../testing/mock-api-responses/subcategories-create';
import { MockApiResponse_CategoriesShow } from '../../testing/mock-api-responses/categories-show';
import { EditCategoryComponent } from './edit-category.component';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../../core/auth.service';
import { HttpService } from '../../core/http.service';
import { click } from '../../testing/index';

import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Router } from '@angular/router';

let component: EditCategoryComponent;
let fixture: ComponentFixture<EditCategoryComponent>;
let page: Page;

describe('EditCategoryComponent', () => {
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
        }).compileComponents().then(createComponent);
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display a list of category name input fields', () => {
        const textInputFields = fixture.debugElement.queryAll(By.css('.category__name'));
        const numberOfLanguages = page.showCategoryResponse.categories_localized.count;
        expect(textInputFields.length).toEqual(numberOfLanguages);
    });

    it('should display category names in the appropriate text input field', (done) => {
        const inputField = _.first(fixture.debugElement.queryAll(By.css('.category__name'))).nativeElement;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(inputField.value).toEqual(_.first(page.showCategoryResponse.categories_localized.records)['name']);
            done();
        });
    });

    it('should disable editing of category names by default', () => {
        const inputField = _.first(fixture.debugElement.queryAll(By.css('.category__name'))).nativeElement;
        expect(inputField.readOnly).toEqual(true);
    });

    it('should hide the commit/cancel buttons by default', () => {
        expect(fixture.debugElement.query(By.css('.category__actions--commit'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.category__actions--cancel'))).toBeFalsy();
    });

    it('should display the commit/cancel buttons after pressing Edit', () => {
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const commitIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--commit'))).nativeElement;
        const cancelIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--cancel'))).nativeElement;
        expect(commitIcon).toBeTruthy();
        expect(cancelIcon).toBeTruthy();
    });

    it('should enable editing on the input when the Edit button is pressed', () => {
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        const inputField = _.first(fixture.debugElement.queryAll(By.css('.category__name'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(inputField.readOnly).toEqual(false);
    });

    it('should disable the input field after pressing the X icon', () => {
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const cancelIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--cancel'))).nativeElement;
        cancelIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const inputField = _.first(fixture.debugElement.queryAll(By.css('.category__name'))).nativeElement;
        expect(inputField.readOnly).toEqual(true);
    });

    it('should disable the input field after pressing the √ icon', () => {
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const commitIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--commit'))).nativeElement;
        commitIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        const inputField = _.first(fixture.debugElement.queryAll(By.css('.category__name'))).nativeElement;
        expect(inputField.readOnly).toEqual(true);
    });

    it('should reset the category name to its original value after pressing the X icon', () => {
        const originalValue = _.first(page.showCategoryResponse.categories_localized.records)['name'];
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        _.first(component.category.categories_localized.records)['name'] = 'new value';
        fixture.detectChanges();
        const cancelIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--cancel'))).nativeElement;
        cancelIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(_.first(component.category.categories_localized.records)['name']).toEqual(originalValue);
    });

    it('should set the updating index after clicking the check mark', () => {
        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        _.first(component.category.categories_localized.records)['name'] = 'new value';
        fixture.detectChanges();
        const commitIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--commit'))).nativeElement;
        commitIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.updatingIndices).toContain(0);
    });

    it('should reset the category name to the original value if the update request fails', () => {
        const originalValue = _.first(page.showCategoryResponse.categories_localized.records)['name'];
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'updateCategoryLocalized').and.returnValue(Observable.of(false));

        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        _.first(component.category.categories_localized.records)['name'] = 'new value';
        fixture.detectChanges();

        const commitIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--commit'))).nativeElement;
        commitIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(_.first(component.category.categories_localized.records)['name']).toEqual(originalValue);
    });

    it('should update the name of the persistedCategory after a successful update', () => {
        const newValue = 'new value';
        spyOn(fixture.debugElement.injector.get(CategoriesService), 'updateCategoryLocalized').and.returnValue(Observable.of(true));

        const editButton = _.first(fixture.debugElement.queryAll(By.css('.category__actions--edit'))).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        _.first(component.category.categories_localized.records)['name'] = newValue;
        fixture.detectChanges();

        const commitIcon = _.first(fixture.debugElement.queryAll(By.css('.category__actions--commit'))).nativeElement;
        commitIcon.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(_.first(component.persistedCategory.categories_localized.records)['name']).toEqual(newValue);
    });

    it('should display a list of subcategories', async () => {
        const subcategoriesEl = fixture.debugElement.queryAll(By.css('.subcategory'));
        expect(subcategoriesEl.length).toEqual(page.showCategoryResponse.subcategories.count);
    });

    it('should display the subcategory id', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__id')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(page.showCategoryResponse.subcategories.records)['id'].toString());
    });

    it('should display the subcategory name', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__name')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(page.showCategoryResponse.subcategories.records)['name'].toString());
    });

    it('should display the subcategory creation DateTime', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__created-at')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(page.showCategoryResponse.subcategories.records)['created_at']);
    });

    it('should display the subcategory update DateTime', () => {
        const subcategoryEl = _.first(fixture.debugElement.queryAll(By.css('.subcategory')))
            .query(By.css('.subcategory__updated-at')).nativeElement;
        expect(subcategoryEl.textContent).toEqual(_.first(page.showCategoryResponse.subcategories.records)['updated_at']);
    });

    it('should call the CategoriesService createSubcategory method after pressing the Create New Subcategory button', () => {
        const createSubcategorySpy = spyOn(page.categoriesService, 'createSubcategory').and.returnValue(Observable.of({
            subcategoryId: page.createSubcategoryResponse.id,
            categoryId: page.createSubcategoryResponse.category_id
        }));
        spyOn(fixture.debugElement.injector.get(Router), 'navigate').and.returnValue(true);
        click(fixture.debugElement.query(By.css('.subcategory__create-button')));
        fixture.detectChanges();
        expect(createSubcategorySpy.calls.count()).toEqual(1);
    });

    it('should display a confirm dialog after pressing the delete button', () => {
        const windowConfirmSpy = spyOn(window, 'confirm').and.returnValue(false);
        click(_.first(page.deleteButtons));
        fixture.detectChanges();
        expect(windowConfirmSpy).toHaveBeenCalledWith(component.deleteConfirmMessage);
    });

    it('should not call deleteSubcategory if the user clicks Cancel at the confirm dialog', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const deleteCategorySpy = spyOn(page.categoriesService, 'deleteSubcategory').and.returnValue(Observable.of(true));
        click(_.first(page.deleteButtons));
        fixture.detectChanges();
        expect(deleteCategorySpy).not.toHaveBeenCalled();
    });

    it('should call deleteSubcategory if the user clicks OK at the confirm dialog', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const deleteCategorySpy = spyOn(page.categoriesService, 'deleteSubcategory').and.returnValue(Observable.of(true));
        click(_.first(page.deleteButtons));
        fixture.detectChanges();
        expect(deleteCategorySpy).toHaveBeenCalled();
    });

    it('should disable the delete button after beginning the delete request', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(page.categoriesService, 'deleteSubcategory').and.returnValue(Observable.of(true));
        click(_.first(page.deleteButtons));
        fixture.detectChanges();
        expect(_.first(page.deleteButtons).disabled).toBe(true);
    });

    it('should remove the subcategory row from the table after a successful deletion', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(page.categoriesService, 'deleteSubcategory').and.returnValue(Observable.of(true));
        click(_.first(page.deleteButtons));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.subcategory__name')).length)
            .toEqual(page.showCategoryResponse.subcategories.count - 1);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;

    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();

    return fixture.whenStable();
}

class Page {
    deleteButtons: HTMLButtonElement[];
    categoriesService: CategoriesService;

    showCategoryResponse: any;
    createSubcategoryResponse: any;

    constructor() {
        this.categoriesService = fixture.debugElement.injector.get(CategoriesService);
        spyOn(this.categoriesService, 'getCategory').and.returnValue(Observable.of(MockApiResponse_CategoriesShow));
        this.showCategoryResponse = _.cloneDeep(MockApiResponse_CategoriesShow);
        this.createSubcategoryResponse = MockApiResponse_SubcategoriesCreate;
    }

    refreshPageElements(): void {
        this.deleteButtons = fixture.debugElement.queryAll(By.css('.subcategory__delete-button')).map(e => e.nativeElement);
    }
}
