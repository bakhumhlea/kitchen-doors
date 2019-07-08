import { Check } from './check.model';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item.model';

export class CheckService {
  private allChecks: Check[] = [
    {
      id: '9888',
      title: 'Zendaya',
      items: [
        {label: 'Laab Kua',qty: 1, price: 16, discount: 0},
        {label: 'Plah Pla Muek',qty: 1,price: 16, discount: 0.15},
        {label: 'Sticky Rice',qty: 2,price: 4, discount: 0},
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
        {label: 'Yaowaraj Noodle',qty: 1, price: 19, discount: 0},
        {label: 'Pretty Hot Wings',qty: 1,price: 12, discount: 0},
        {label: 'Massaman Nuea',qty: 1,price: 35, discount: 0},
        {label: 'White Jasmine Rice',qty: 2,price: 4, discount: 0},
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
  checkUpdate = new Subject;
  
  getEmptyCheck(data: any) {
    let id = (Math.round(Math.random() * 1000)).toString();
    let checkTamplate: Check = {
      id: id,
      title: `New Guest (${this.getFormatTime(new Date(Date.now()))})`,
      items: [],
      guest: 1,
      host: data.host,
      create_at: new Date(Date.now()),
      saved: true,
      adjusted_tip: false,
    }
    this.currentCheck = checkTamplate;
    return this.currentCheck;
  }
  addItem(item:Item) {
    let hasThisItem = this.currentCheck.items.map(i=>i.label).indexOf(item.label);
    if (hasThisItem >= 0) {
      this.currentCheck.items[hasThisItem].qty++;
    } else {
      let newItem = {
        ...item,
        qty: 1,
        discount: 0
      };
      this.currentCheck.items = [...this.currentCheck.items, newItem];
    }
    
    this.hasChanged = true;
  }
  editCheckDetails(data:any) {
    this.currentCheck = {
      ...this.currentCheck,
      guest: !!!data.guest?1:data.guest,
      title: data.title===''?`New Guest (${this.getFormatTime(this.currentCheck.create_at)})`:data.title
    };
    this.hasChanged = true;
    this.checkUpdate.next(this.currentCheck);
  }
  isEmpty(obj:any) {
    return obj === undefined ||
      obj === null || 
      obj.length === 0 ||
      Object.keys(obj).length === 0;
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
  getFormatTime(date:Date) {
    let h = date.getHours();
    let m = date.getMinutes();
    return `${h<10?'0'+h:h}:${m<10?'0'+m:m}`;
  }
}
//(Math.round(Math.random() * 1000)).toString()