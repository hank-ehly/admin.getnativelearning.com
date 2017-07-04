import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerFormComponent } from './form.component';

describe('SpeakerFormComponent', () => {
  let component: SpeakerFormComponent;
  let fixture: ComponentFixture<SpeakerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
