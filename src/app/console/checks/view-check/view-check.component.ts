import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ViewCheckService } from './view-check.service';
import { CustomerLookupComponent } from './common/customer-lookup.component';
import { CheckService } from '../check/check.service';
import { Check } from '../check/check.model';
import { Item } from '../check/item.model';
import { AnimationService } from 'src/app/navigation/header/animation.service';


@Component({
  selector: 'app-view-check',
  templateUrl: './view-check.component.html',
  styleUrls: ['./view-check.component.css']
})
export class ViewCheckComponent implements OnInit {
  
  itemTabs = [
    {label:'Bites',query: 'bites'},
    {label:'Greens',query: 'greens'},
    {label:'Curries',query: 'curries'},
    {label:'Meats',query: 'meats'},
    {label:'Fish & Seafood',query: 'fish_seafood'},
    {label:'Sides',query: 'sides'},
    {label:'Desserts',query: 'desserts'}
  ];

  activeTab = null;
  isItemsContainerActive = true;
  displayedColumns: string[] = ['item', 'qty', 'price', 'subtotal', 'discount','total'];
  check: Check;
  selectedCustomer: string;

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
      this.check = this.checkService.getEmptyCheck();
    } else {
      this.check = this.checkService.getCheck(id);
    }
  }
  onAddItem(item:Item) {
    this.checkService.addItem(item);
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
  // inteface control method
  onClickTabButton(tab:any) {
    this.activeTab = tab.query;
  }
  onToggleItemContainer() {
    this.isItemsContainerActive = !this.isItemsContainerActive;
  }
  onToggleBtnPanel() {
    this.animationService.toggleBtnPanel();
  }

}
