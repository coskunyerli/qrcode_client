import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpEntryComponent } from './otp-entry.component';

describe('OtpEntryComponent', () => {
  let component: OtpEntryComponent;
  let fixture: ComponentFixture<OtpEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpEntryComponent]
    });
    fixture = TestBed.createComponent(OtpEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
