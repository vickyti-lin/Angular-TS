import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  proStatus = ['Stable', 'Critical', 'Finished'];
  signUpForm: FormGroup;
  forbiddenUsername = ['Test'];

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, this.forbiddenNames.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['']
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  get usernameControl(): AbstractControl {
    return this.signUpForm.get('username');
  }
  get emailControl(): AbstractControl {
    return this.signUpForm.get('email');
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}


