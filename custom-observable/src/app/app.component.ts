import { Subscription } from 'rxjs';
import { Data } from '@angular/router';
import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(
      (data: boolean) => {
        this.userActivated = data;
      }
    );
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
