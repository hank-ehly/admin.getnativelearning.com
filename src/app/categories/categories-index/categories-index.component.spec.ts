import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { MockApiResponse_CategoriesIndex } from '../../testing/mock-api-responses/categories-index';
import { RouterLinkStubDirective } from '../../testing/router-link-stub.directive';
import { CategoriesIndexComponent } from './categories-index.component';
import { CategoriesService } from '../categories.service';
import { RouterStub } from '../../testing/router-stub';
import { HttpService } from '../../core/http.service';
import { AuthService } from '../../core/auth.service';
import { click } from '../../testing/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

let comp: CategoriesIndexComponent;
let fixture: ComponentFixture<CategoriesIndexComponent>;
let page: Page;

describe('CategoriesIndexComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CategoriesIndexComponent,
                RouterLinkStubDirective
            ],
            imports: [
                HttpModule
            ],
            providers: [
                CategoriesService,
                HttpService,
                AuthService,
                {
                    provide: Router,
                    useClass: RouterStub
                }
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

    it('should display a button for creating a new category', () => {
        expect(page.createNewCategoryButton).toBeTruthy();
    });

    it('should call the createCategory method of the category service after pressing the Create New Category button', () => {
        click(page.createNewCategoryButton);
        fixture.detectChanges();
        expect(page.createCategorySpy.calls.count()).toEqual(1);
    });

    it('should display a confirm dialog after pressing the delete button', () => {
        const windowConfirmSpy = spyOn(window, 'confirm').and.returnValue(false);
        click(_.nth(page.deleteButtons, 3));
        fixture.detectChanges();
        expect(windowConfirmSpy).toHaveBeenCalledWith(comp.deleteConfirmMessage);
    });

    it('should call deleteCategory if the user clicks OK at the confirm dialog', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const deleteCategorySpy = spyOn(page.categoriesService, 'deleteCategory').and.returnValue(Observable.of(true));
        click(_.nth(page.deleteButtons, 3));
        fixture.detectChanges();
        expect(deleteCategorySpy).toHaveBeenCalled();
    });

    it('should not call deleteCategory if the user clicks Cancel at the confirm dialog', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const deleteCategorySpy = spyOn(page.categoriesService, 'deleteCategory').and.returnValue(Observable.of(true));
        click(_.nth(page.deleteButtons, 3));
        fixture.detectChanges();
        expect(deleteCategorySpy).not.toHaveBeenCalled();
    });

    it('should disable the delete button after beginning the delete request', () => {
        const categoryIndex = 3;
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(page.categoriesService, 'deleteCategory').and.returnValue(Observable.of(true));
        click(_.nth(page.deleteButtons, categoryIndex));
        fixture.detectChanges();
        expect(_.nth(page.deleteButtons, categoryIndex).disabled).toBe(true);
    });

    it('should remove the category row from the table after a successful deletion', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(page.categoriesService, 'deleteCategory').and.returnValue(Observable.of(true));
        click(_.nth(page.deleteButtons, 3));
        fixture.detectChanges();
        page.refreshPageElements();
        expect(page.categoryIds.length).toEqual(MockApiResponse_CategoriesIndex.count - 1);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(CategoriesIndexComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    page.refreshPageElements();
    return fixture.whenStable();
}

class Page {
    categoryIds: HTMLTableDataCellElement[];
    categoryNames: HTMLTableDataCellElement[];
    subcategoryCounts: HTMLTableDataCellElement[];
    deleteButtons: HTMLButtonElement[];
    createNewCategoryButton: HTMLButtonElement;
    createCategorySpy: jasmine.Spy;
    categoriesService: CategoriesService;

    constructor() {
        this.categoriesService = fixture.debugElement.injector.get(CategoriesService);
        spyOn(this.categoriesService, 'getCategories').and.returnValue(Observable.of(MockApiResponse_CategoriesIndex.records));
        this.createCategorySpy = spyOn(this.categoriesService, 'createCategory').and.returnValue(Observable.of(true));
    }

    refreshPageElements() {
        this.categoryIds = fixture.debugElement.queryAll(By.css('.category__id')).map(e => e.nativeElement);
        this.categoryNames = fixture.debugElement.queryAll(By.css('.category__name')).map(e => e.nativeElement);
        this.subcategoryCounts = fixture.debugElement.queryAll(By.css('.category__subcategories-count')).map(e => e.nativeElement);
        this.deleteButtons = fixture.debugElement.queryAll(By.css('.category__action--delete')).map(e => e.nativeElement);
        this.createNewCategoryButton = fixture.debugElement.query(By.css('.category__create-button')).nativeElement;
    }
}
