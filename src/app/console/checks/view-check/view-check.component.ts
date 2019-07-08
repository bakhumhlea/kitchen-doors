import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ViewCheckService } from './view-check.service';
import { CustomerLookupComponent } from './common/customer-lookup.component';
import { CheckService } from '../check/check.service';
import { Check } from '../check/check.model';
import { AnimationService } from 'src/app/navigation/header/animation.service';
import { DetailsEditorComponent } from './common/details-editor.component';


@Component({
  selector: 'app-view-check',
  templateUrl: './view-check.component.html',
  styleUrls: ['./view-check.component.css']
})
export class ViewCheckComponent implements OnInit {
  check: Check;
  selectedCustomer: string;
  checkSubscription: Subscription;

  constructor(
    private viewCheckService: ViewCheckService, 
    private animationService: AnimationService,
    private dialog: MatDialog, 
    private checkService: CheckService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id === 'new-check' || !!!id) {
      this.check = this.checkService.getEmptyCheck({host: 'Host name'});
    } else {
      this.check = this.checkService.getCheck(id);
    }
    this.checkSubscription = this.checkService.checkUpdate.subscribe(value => {
      this.check = this.checkService.getCurrentCheck();
    })
  }
  onCustomerLookup() {
    const dialogRef = this.dialog.open(CustomerLookupComponent, {data: {
      customers: ['Erika','Arron','Tom','Vannessa'],
      selectedCustomer: this.selectedCustomer
    }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCustomer = dialogRef.componentInstance.selectedCustomer;
      }
    })
  }
  onEditDetails() {
    const dialogRef = this.dialog.open(DetailsEditorComponent, { 
      data: {guest: this.check.guest, title: this.check.title },
      width: '400px',
      height: '360px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.checkService.editCheckDetails(result); }
    });
  }
  saveCheck() {
    let id = this.route.snapshot.paramMap.get('id');
    this.checkService.saveCheck(id);
    this.router.navigate(['/console/checks'])
  }
  getSubtotal() {
    return this.viewCheckService.getSubtotal(this.check);
  }
  getDiscount() {
    return this.viewCheckService.getDiscount(this.check);
  }
  getTax() {
    return {
      taxRate: '+' + (this.viewCheckService.taxRate * 100).toString() + '%',
      cash: this.viewCheckService.getTax(this.check)
    }
  }
  getTotal() {
    return this.viewCheckService.getTotal(this.check);
  }
  // interface control method
  onToggleBtnPanel() {
    this.animationService.toggleBtnPanel();
  }

}
