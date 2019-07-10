import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-setting-panel',
  templateUrl: './setting-panel.component.html',
  styleUrls: ['./setting-panel.component.css']
})
export class SettingPanelComponent implements OnInit {

  constructor(
    private authService: AuthServices
  ) { }

  isAuth() {
    return this.authService.isAuth();
  }
  ngOnInit() {
  }

}
