import { Component, OnInit, Input } from '@angular/core';
import { Check } from './check.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  @Input() check: any;
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
    var checkCreated = new Date(this.check.create_at.seconds * 1000)
    var dif = today - checkCreated.getDate();
    // var dif = 1;
    switch (dif) {
      case 0:
        this.createWhen = this.getFormatTime(checkCreated);
        break;
      case 1:
        this.createWhen = 'Yesterday';
        break;
      default:
        this.createWhen = `${dif} days ago`
        break;
    }
  }

  isCheckClosed() {
    return this.check.closed ? true : false ;
  }

  onClick(id: string) {
    this.router.navigate(['/console/checks/viewcheck', id])
  }
}
