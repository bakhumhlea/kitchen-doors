import { Component, OnInit, Input } from '@angular/core';
import { Check } from './check.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @Input() check: Check;
  createWhen: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getWhen();
  }
  getFormatTime(date:Date) {
    let h = date.getHours();
    let m = date.getMinutes();
    return `${h<10?'0'+h:h}:${m<10?'0'+m:m}`;
  }
  getWhen() {
    var today = new Date(Date.now()).getDate();
    var dif = today - this.check.create_at.getDate();
    switch (dif) {
      case 0:
        this.createWhen = this.getFormatTime(this.check.create_at);
        break;
      case 1:
        this.createWhen = 'Yesterday';
        break;
      default:
        this.createWhen = `${dif} days ago`
        break;
    }
  }

  isCheckClose() {
    return (this.check.saved && !this.check.adjusted_tip) ? false : true ;
  }

  onClick(id: string) {
    // [routerLink]="[ '/console/checks/viewcheck', check.id ]"
    this.router.navigate(['/console/checks/viewcheck', id])
  }
}
