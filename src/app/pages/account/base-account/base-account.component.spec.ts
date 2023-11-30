import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAccountComponent } from './base-account.component';

describe('BaseAccountComponent', () => {
  let component: BaseAccountComponent;
  let fixture: ComponentFixture<BaseAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseAccountComponent]
    });
    fixture = TestBed.createComponent(BaseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
