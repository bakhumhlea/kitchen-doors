import { Component, OnInit } from '@angular/core';
import { AuthServices } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServices
  ) {}
  ngOnInit() {
    this.authService.initAuthListener()
  }
  title = 'kitchen-door';
}
