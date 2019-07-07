import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServices } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  maxDate: any;

  constructor(private authService: AuthServices) { }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.data,
      password: form.value.data
    });
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

}
