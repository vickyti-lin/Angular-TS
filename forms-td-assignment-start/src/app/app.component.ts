import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) signUp : NgForm;
  defaultSelect = 'Advanced';
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit() {
    console.log(this.signUp);
    this.submitted = true;
    this.user.email = this.signUp.value.userData.email;
    this.user.subscription = this.signUp.value.userData.select;
    this.user.password = this.signUp.value.userData.password;

    this.signUp.reset();
  }
}
