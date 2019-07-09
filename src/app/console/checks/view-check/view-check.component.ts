import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ViewCheckService } from './view-check.service';
import { CustomerLookupComponent } from './common/customer-lookup.component';
import { CheckService } from '../check/check.service';
import { Check } from '../check/check.model';
import { AnimationService } from 'src/app/navigation/header/animation.service';
import { DetailsEditorComponent } from './common/details-editor.component';
import { HeaderService } from 'src/app/navigation/header/header.service';


@Component({
  selector: 'app-view-check',
  templateUrl: './view-check.component.html',
  styleUrls: ['./view-check.component.css']
})
export class ViewCheckComponent implements OnInit, OnDestroy {
  private check: Check;
  selectedCustomer: string;
  checkSubscription: Subscription;
  checksSubscription: Subscription;

  constructor(
    private viewCheckService: ViewCheckService, 
    private animationService: AnimationService,
    private headerService: HeaderService,
    private dialog: MatDialog, 
    private checkService: CheckService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.headerService.dispatchCurrentView('TRSC');
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (id === 'new-check' || !!!id) {
      this.check = this.checkService.getEmptyCheck({host: 'Host name'});
    } else {
      this.checkService.getCheck(id);
    }
    this.checkSubscription = this.checkService.checkUpdate.subscribe(value => {
      this.check = value;
    });
  }
  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
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
  getCheckDetails() {
    return {
      title: this.check.title,
      guest: this.check.guest
    }
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
  discardCheck() {
    // console.log(this.check);
    let id = this.check.id;
    this.checkService.discardCheck(id);
    this.router.navigate(['/console/checks']);
  }
  saveCheck() {
    let id = this.check.id;
    this.checkService.saveCheck(id);
    this.router.navigate(['/console/checks'])
  }
  closeCheck(id:string, payment: string) {
    this.checkService.closeCheck(id,payment);
  }
  isCheckClosed() {
    return this.checkService.isCheckClosed();
  }
  adjustTips() {
    this.checkService.adjustTips(this.check.id);
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
