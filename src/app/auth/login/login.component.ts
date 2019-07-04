import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors= {};
  correctCredential = {
    email: '23chaysawat@gmail.com',
    password: 'chaysawat023'
  };
  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    })
  }

  onSubmit(form) {
    if (form.value.email !== this.correctCredential.email) {
      console.log(form.value);
      this.errors = { email: `We can't find any match to this email address`};
      console.log(this.errors)
    } else if (form.value.email !== this.correctCredential.password) {
      console.log(form.value);
      this.errors = { password: 'Password is incorrect'};
      console.log(this.errors)
    } else {
      console.log(form.value);
    }
  }

}
