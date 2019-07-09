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
  displayedColumns: string[] = ['delete','item', 'qty', 'price', 'subtotal', 'discount','total'];
  items = [];
  private showDeleteBtn: number = null;
  private checkSubscription: Subscription;

  constructor(
    private checkService: CheckService
  ) { }

  getSubtotal(item: Item) {
    return item.price * item.qty
  }
  getTotal(item: Item) {
    return (((item.price) - (item.price * item.discount)) * item.qty);
  }
  onClickItem(index:number) {
    if (this.showDeleteBtn) {
      this.showDeleteBtn = null;
    } else {
      this.showDeleteBtn = index;
    }
  }
  isCheckClosed() {
    return this.checkService.isCheckClosed();
  }
  increment(item: Item) {
    item.qty++;
  }
  decrement(item: Item) {
    if (item.qty>1) item.qty--;
  }
  removeItem(index:number) {
    this.checkService.removeItem(index);
  }
  ngOnInit() {
    // console.log(this.checkId);
    // this.checkService.getCheck(this.checkId);
    // this.checkSubscription = this.checkService.checkUpdate.subscribe(value => {
    //   console.log(value)
    //   this.checkRef = value;
    // });
  }

}
