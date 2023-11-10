import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDoneComponent } from './registration-done.component';

describe('RegistrationDoneComponent', () => {
  let component: RegistrationDoneComponent;
  let fixture: ComponentFixture<RegistrationDoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationDoneComponent]
    });
    fixture = TestBed.createComponent(RegistrationDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
