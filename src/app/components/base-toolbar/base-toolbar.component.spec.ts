import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseToolbarComponent } from './base-toolbar.component';

describe('BaseToolbarComponent', () => {
  let component: BaseToolbarComponent;
  let fixture: ComponentFixture<BaseToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseToolbarComponent]
    });
    fixture = TestBed.createComponent(BaseToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
