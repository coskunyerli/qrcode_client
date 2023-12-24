import { Component, Inject, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-info-icon-container',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.css']
})
export class InfoIconComponent {

  @Input() message: string = "";
  constructor(
    private bottomSheet: MatBottomSheet
  ) { }
  openBottomSheet(e: any) {
    e.stopPropagation();
    this.bottomSheet.open(InfoBottomSheetOverview, { data: this.message });
  }
}

@Component({
  template: '<p style="margin-bottom:1rem;padding:0.5rem"> {{message}} </p>',
})
export class InfoBottomSheetOverview {
  public message: string = "";
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<InfoBottomSheetOverview>) {
    this.message = data as string;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

