import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRFounderPageComponent } from './qr-founder-page.component';


describe('QRFounderPageComponent', () => {
  let component: QRFounderPageComponent;
  let fixture: ComponentFixture<QRFounderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRFounderPageComponent]
    });
    fixture = TestBed.createComponent(QRFounderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
