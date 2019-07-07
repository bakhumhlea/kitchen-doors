import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Check } from '../../check/check.model';
import { Item } from '../../check/item.model';
import { CheckService } from '../../check/check.service';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit {
  @Input() check: Check;
  displayedColumns: string[] = ['item', 'qty', 'price', 'subtotal', 'discount','total'];
  items = [];
  private itemsSubscription: Subscription;

  constructor(private checkService: CheckService) { }

  getSubtotal(item: Item) {
    return item.price * item.qty
  }
  getTotal(item: Item) {
    return (((item.price) - (item.price * item.discount)) * item.qty);
  }
  onClickItem(item: Item) {
    console.log(item);
  }
  ngOnInit() {

  }

}
