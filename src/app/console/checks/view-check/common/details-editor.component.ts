import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-details-editor',
  styleUrls: ['./details-editor.component.css'],
  template: `
    <p class="kd-dialog-hd" style="width:100%;font-size:1.2em;font-weight:600;text-align:center;margin-bottom:10px;">
        <span>Ticket Details</span>
      </p>
    <div mat-dialog-content style="border-top: 1px solid #212121;border-bottom: 1px solid #212121;margin-bottom: 10px;">
      <mat-form-field 
        style="width: 100%;width: 100%;display: block;margin: 0 auto;text-align: center;" color="primary">
        <p style="font-family: 'Poppins';font-size: 0.8em;margin-bottom: 10px;">Table / Guest Name</p>
        <div style="display: flex;align-items: center;">
          <input 
            style="font-family:'Poppins';font-size: 1.4em;width: 100%;height:40px;transform: translateX(0px);"
            matInput 
            name="Guest"
            [(ngModel)]="title">
          <button mat-button matSuffix *ngIf="title" mat-icon-button aria-label="Clear" (click)="title=''" style="transform: translateY(0);position:absolute;right: 0;">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </mat-form-field>
      <mat-form-field style="width: 60%;margin:auto;display: block;margin: 0 auto;text-align: center;" color="primary">
        <p style="font-family: 'Poppins';font-size: 0.8em;margin-bottom: 10px;">Guest Number</p>
        <div style="display: flex;align-items: center;">
          <button mat-button matPrefix mat-icon-button aria-label="Clear" (click)="guest=decrement(guest)" style="transform: translateY(0);">
            <mat-icon>remove</mat-icon>
          </button>
          <input class="kd-input-number" style="font-family:'Poppins';font-size: 1.4em;transform: translateX(0);" matInput type="number" min="0" max="50" [(ngModel)]="guest">
          <button mat-button matSuffix mat-icon-button aria-label="Clear" (click)="guest=guest+1" style="transform: translateY(0);">
          <mat-icon>add</mat-icon>
        </button>
        </div>
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="justify-content: center;">
      <button 
        mat-raised-button
        color="warn"
        class="kd-btn"
        [mat-dialog-close]="{guest: guest, title: title}"
        style="width: 150px;margin: 0 10px;"
      >
        Save
      </button>
      <button 
        mat-button
        class="kd-btn"
        [mat-dialog-close]="false"
        style="width: 150px;margin: 0 10px;    color: #b1b1b1;
        border: 1px solid #232323;"
      >
        Cancel
      </button>
    </div>
  `
})
export class DetailsEditorComponent implements OnInit {
  guest: number;
  title: string;

  constructor (
    @Inject(MAT_DIALOG_DATA) private passedData: any
  ) {}

  ngOnInit(): void {
    this.guest = this.passedData.guest;
    this.title = this.passedData.title;
  }
  decrement(data:number) {
    return data>1?data-1:data;
  }
}