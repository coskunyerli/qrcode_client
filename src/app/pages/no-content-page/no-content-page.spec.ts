import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentPageComponent } from './no-content-page';

describe('NoContentPageComponent', () => {
  let component: NoContentPageComponent;
  let fixture: ComponentFixture<NoContentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoContentPageComponent]
    });
    fixture = TestBed.createComponent(NoContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
