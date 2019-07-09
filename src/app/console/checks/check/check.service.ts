import { Check } from './check.model';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ViewCheckService } from '../view-check/view-check.service';

@Injectable()

export class CheckService {
  private checks: Check[] = [
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
      adjusted_tips: false,
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
      adjusted_tips: true,
    }
  ];
  private check: Check;
  private fbSubscriptions: Subscription[] = [];
  
  hasChanged: boolean = false;
  checkUpdate = new Subject<Check>();
  checksUpdate = new Subject<Check[]>();
  checkItemsUpdate = new Subject<Item[]>();
  
  constructor (
    private db: AngularFirestore,
    private viewCheckService: ViewCheckService
  ) {}

  getEmptyCheck(data: any) {
    let id = (Math.round(Math.random() * 1000)).toString();
    let checkTamplate: Check = {
      title: `New Guest (${this.getFormatTime(new Date(Date.now()))})`,
      items: [],
      guest: 1,
      host: data.host,
      create_at: new Date(),
      closed: false,
      purchase_value: 0,
      adjusted_tips: false,
    }
    this.check = checkTamplate;
    return this.check;
  }
  getCheck(id:string) {
    this.fbSubscriptions.push(this.db
      .collection('checks')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc=>{
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        }).find((check:any) => check.id === id)
      })
      .subscribe((check:any) => {
        this.check = check;
        this.checkUpdate.next(this.check);
      }));
  }
  getAllCheck() {
    this.fbSubscriptions.push(this.db
      .collection('checks', ref => ref.orderBy('create_at','desc'))
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc=>{
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })
      .subscribe((checks:any[]) => {
        this.checks = checks.filter(check=>check.adjusted_tips === false);
        this.checksUpdate.next([...this.checks]);
      }));
  }
  isCheckClosed() {
    return this.check.closed;
  }
  addItem(item:Item) {
    let hasThisItem = this.check.items.map(i=>i.label).indexOf(item.label);
    if (this.check.closed) {
      console.log('This check has been paid');
    } else {
      if (hasThisItem >= 0) {
        this.check.items[hasThisItem].qty++;
      } else {
        let newItem = {
          ...item,
          qty: 1,
          discount: 0
        };
        this.check.items = [...this.check.items, newItem];
      }
      this.hasChanged = true;
    }
  }
  removeItem(index:number) {
    if (this.check.closed) {
      console.log('This check has been paid');
    } else {
      this.check.items.splice(index,1);
    }
  }
  getCheckId() {
    return this.check.id;
  }
  editCheckDetails(data:any) {
    this.check = {
      ...this.check,
      guest: !!!data.guest?1:data.guest,
      title: data.title===''?`New Guest (${this.getFormatTime(this.check.create_at)})`:data.title
    };
    this.hasChanged = true;
    this.checkUpdate.next(this.check);
  }
  saveCheck(id:string) {
    let subtotal = this.viewCheckService.getSubtotal(this.check);
    if (this.check.closed) {
      console.log(`Don't forget to adjust tips!`);
    } else {
      if (!!!id) {
        // console.log('Add');
        this.db
          .collection('checks')
          .add({
            ...this.check,
            purchase_value: subtotal
          })
      } else {
        // console.log('Update');
        this.db
          .collection('checks').doc(id)
          .update({
            ...this.check,
            purchase_value: subtotal
          })
        this.check = null;
        this.hasChanged = false;
      }
    }
  }
  closeCheck(id:string, payment:string) {
    if (this.check.closed) {
      console.log(`Don't forget to adjust tips!`);
    } else {
      this.db
      .doc('checks/'+id).update({
        closed: true,
        payment: payment
      })
      .then(() => 'Check Close')
      .catch(err => console.log(err))
    }
  }
  adjustTips(id:string) {
    if (this.check.closed) {
      this.db
      .doc('checks/'+id).update({
        adjusted_tips: true,
      })
      .then(() => 'Check Close')
      .catch(err => console.log(err))
    }
  }
  discardCheck(id:string) {
    // console.log(id);
    if (this.check.closed) {
      console.log(`Don't forget to adjust tips!`)
    } else {
      if (!!!id) {
        // console.log('discard')
        this.check = null;
        // console.log(this.check);
        this.hasChanged = false;
      } else {
        // console.log(id)
        // console.log('delete')
        this.db
          .collection('checks')
          .doc(id).delete()
          .then(() => console.log(`Check ID:${id} is succesfully removed from Firestore!`))
          .catch(err => console.log(err))
      }
    }
  }

  cancelSubscriptions() {
    this.fbSubscriptions.forEach(sub => sub.unsubscribe())
  }
  // helpers
  getFormatTime(date:Date) {
    let h = date.getHours();
    let m = date.getMinutes();
    return `${h<10?'0'+h:h}:${m<10?'0'+m:m}`;
  }
  isEmpty(obj:any) {
    return obj === undefined ||
      obj === null || 
      obj.length === 0 ||
      Object.keys(obj).length === 0;
  }
}
//(Math.round(Math.random() * 1000)).toString()