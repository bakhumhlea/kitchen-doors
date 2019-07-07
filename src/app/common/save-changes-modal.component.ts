import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-savechanges-modal-lookup',
  template: `
    <div mat-dialog-content style="border-bottom: 1px solid #212121;margin-bottom: 10px;">
      <p class="kd-dialog-hd" style="width:100%;font-size:0.8em;font-weight:300;text-align:center;margin-bottom:10px;">
        <span>There are changes on this check.</span>
      </p>
      <p class="kd-dialog-hd" style="width:100%;font-size:1.2em;font-weight:600;text-align:center;margin-bottom:10px;">
        <span>Would you like to save it?</span>
      </p>
    </div>
    <div mat-dialog-actions style="justify-content: center;">
      <button 
        mat-raised-button
        color="warn"
        class="kd-btn"
        [mat-dialog-close]="true"
        style="width: 150px;margin: 0 10px;"
      >
        Save Changes
      </button>
      <button 
        mat-raised-button
        color="primary"
        class="kd-btn"
        [mat-dialog-close]="false"
        style="width: 150px;margin: 0 10px;"
      >
        Go Back
      </button>
    </div>
  `
})

export class SaveChangesModalComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {}
    ngOnInit(): void {}
};