import { Component, Inject, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-customer-lookup',
  template: `
    <div class="kd-dialog" style="width:400px;height:200px;position:relative;transform: translateY(-28px);">
      <mat-dialog-actions style="width: 100%;height: 100%;">
        <h5 class="kd-dialog-hd" style="width:100%;font-size:1em;font-weight:400;display:flex;align-items:center;justify-content:space-between;border-bottom: 1px solid #6f6f6f;padding: 5px 0;">
          <span>Customers</span>
          <button class="kd-btn" style="cursor:pointer;background-color:transparent;color:white;border:none;outline:none;" [mat-dialog-close]="true">
          <mat-icon>clear</mat-icon>
        </button>
        </h5>
        <div style="width:100%;height:100%l">
          <button 
            mat-button 
            *ngFor="let customer of customers" 
            style="font-family:'Poppins';font-size:0.8em;font-weight:300;padding:0 4px;width:100%;height:30px;border-radius:none;margin:0;text-align: left;"
            (click)="onSelectCustomer(customer)"
            [mat-dialog-close]="true"
          >
            {{customer}}</button>
        </div>
      </mat-dialog-actions>
    </div>
  `
})

export class CustomerLookupComponent implements OnInit {
    customers: any;
    selectedCustomer: any;

    constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {}
    ngOnInit(): void {
      this.customers = this.passedData.customers;
      this.selectedCustomer = this.passedData.selectedCustomer;
    }
    onSelectCustomer(customer:any) {
      this.selectedCustomer = customer;
    }
};