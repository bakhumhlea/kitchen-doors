import { Component, OnInit } from '@angular/core';
import { Check } from './check/check.model';
import { CheckService } from './check/check.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {
  checks: Check[] = [];
  constructor(private checkService: CheckService) { }

  ngOnInit() {
    this.checks = this.checkService.getAllCheck();
  }

}
