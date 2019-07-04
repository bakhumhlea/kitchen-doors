import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService}  from './dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  name = "wine";
  value = 10;
  isDisable = false;
  products = []
  private productSubcription: Subscription;

  constructor(private dashboardService: DashboardService) {
    setTimeout(()=>{
      
    },3000);
  }
  ngOnInit() {
    this.products = this.dashboardService.getProducts();
    this.productSubcription = this.dashboardService.productsUpdated.subscribe(()=>{
      this.products = this.dashboardService.getProducts();
    });
  }
  ngOnDestroy() {
    this.productSubcription.unsubscribe();
  }
  onRemoveProduct(product: object) {
    this.dashboardService.onRemoveProduct(product);
  }
  onAddProduct(form) {
    console.log(form.value);
    if (form.valid) {
      this.dashboardService.addProduct(form.value);
    }
  }
}