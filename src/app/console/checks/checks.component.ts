import { Component, OnInit, OnDestroy } from '@angular/core';
import { Check } from './check/check.model';
import { CheckService } from './check/check.service';
import { Subscription } from 'rxjs';
// import { map } from 'rxjs/operators'
import 'rxjs/add/operator/map';
import { HeaderService } from 'src/app/navigation/header/header.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit, OnDestroy {
  checks: Check[];
  checksSubscription: Subscription;
  constructor(
    private checkService: CheckService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.dispatchCurrentView('CHCK');
    this.checkService.getAllCheck();
    this.checksSubscription = this.checkService.checksUpdate.subscribe(results => {
        this.checks = results;
    })
  }
  ngOnDestroy(): void {
    this.checksSubscription.unsubscribe();
  }
}
