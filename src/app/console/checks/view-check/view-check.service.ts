import { Subject } from 'rxjs';
import { Check } from '../check/check.model';

export class ViewCheckService{
  taxRate: number = 0.085;
  isEmpty(obj:any) {
    return obj === undefined ||
      obj === null || 
      obj.length === 0 ||
      Object.keys(obj).length === 0;
  }
  getSubtotal(check:Check) {
    if (this.isEmpty(check.items)) {
      return 0;
    } else {
      return check.items.map(item => item.qty * item.price ).reduce((acc,value) => acc+value, 0);
    }
  }
  getDiscount(check:Check) {
    if (this.isEmpty(check.items)) {
      return {
        percent: 0,
        cash: 0
      }
    } else {
      return {
        percent: '-' + (check.items.map(item => item.discount).reduce((a,v) => a+v, 0) * 100).toString() + '%',
        cash: check.items.map(item => item.price * item.discount * item.qty).reduce((a,v) => a+v, 0)
      }
    }
  }
  getTax(check:Check) {
    return  (this.getSubtotal(check) - this.getDiscount(check).cash) * this.taxRate;
  }
  getTotal(check:Check) {
    return this.getSubtotal(check) - this.getDiscount(check).cash + this.getTax(check);
  }
}