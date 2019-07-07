import { Check } from './check.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item.model';

export class CheckService {
  private allChecks: Check[] = [
    {
      id: '9888',
      title: 'Zendaya',
      items: [
        {item: 'Laab Kua',qty: 1, price: 14, discount: 0},
        {item: 'Plah Pla Muek',qty: 1,price: 21, discount: 0.05},
        {item: 'Sticky Rice',qty: 2,price: 4, discount: 0},
      ],
      guest: 1,
      host: 'Tatuu',
      create_at: new Date(Date.now()),
      saved: true,
      adjusted_tip: false,
    },
    {
      id: '4567',
      title: 'Matt',
      items: [
        {item: 'Yaowaraj Noodle',qty: 1, price: 18, discount: 0},
        {item: 'Pretty Hot Wings',qty: 1,price: 10, discount: 0},
        {item: 'Massaman Nuea',qty: 1,price: 14, discount: 0},
        {item: 'White Jasmine Rice',qty: 2,price: 4, discount: 0},
      ],
      guest: 4,
      host: 'Stefan',
      create_at: new Date(Date.now()),
      saved: true,
      adjusted_tip: true,
    }
  ];

  private currentCheckId: string;
  private currentCheck: Check;
  hasChanged: boolean = false;

  getEmptyCheck() {
    let id = (Math.round(Math.random() * 1000)).toString();
    let checkTamplate: Check = {
      id: id,
      title: 'Guest Name',
      items: [],
      guest: 0,
      host: 'The one who open',
      create_at: new Date(Date.now()),
      saved: true,
      adjusted_tip: false,
    }
    this.currentCheck = checkTamplate;
    return this.currentCheck;
  }
  addItem(item:Item) {
    let newItem = {
      ...item,
      qty: 1,
      discount: 0
    };
    this.currentCheck.items = [...this.currentCheck.items, newItem];
    this.hasChanged = true;
  }
  getCheck(id:string) {
    this.currentCheck = {...this.allChecks.find(check => check.id === id)};
    return this.currentCheck;
  }
  getAllCheck() {
    return this.allChecks.slice();
  }
  getCurrentCheckId() {
    return this.currentCheckId;
  }
  getCurrentCheck() {
    return this.currentCheck;
  }
  saveCheck(id:string) {
    let index = this.allChecks.map(check=>check.id).indexOf(this.currentCheck.id);
    console.log(index);
    if (index < 0) {
      this.allChecks.unshift(this.currentCheck);
      this.currentCheck = null;
      this.hasChanged = false;
    } else {
      this.allChecks[index] = this.currentCheck;
      this.currentCheck = null;
      this.hasChanged = false;
    }
  }
}
//(Math.round(Math.random() * 1000)).toString()