import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCollocationComponent } from './index.component';

describe('IndexCollocationComponent', () => {
  let component: IndexCollocationComponent;
  let fixture: ComponentFixture<IndexCollocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCollocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
