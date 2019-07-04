import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: object;
  @Output() productClicked = new EventEmitter();

  constructor(private dashboardService: DashboardService) {

  }

  onClicked(){
    this.productClicked.emit();
  }
  ngOnInit() {
  }

}
