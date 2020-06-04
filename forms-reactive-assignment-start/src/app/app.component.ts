import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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
      email: ['', [Validators.required, Validators.email], this.forbiddenEmails],
      status: ['Critical']
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
    if (control.value === 'Test') {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}


