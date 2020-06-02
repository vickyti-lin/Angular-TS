import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customInterval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customInterval.pipe(filter((data: number) => {
      return data > 0;  // 過濾0
    }), map((data: number) => {
      return 'Round: ' + (data + 1); // 1+1
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      console.log('Completed!');
    });

    // 另一個例子
    const squareOdd = of(1, 2, 3, 4, 5)
    .pipe(
      filter((n: number) => n % 2 !== 0),
      map((n: number) => n * n)
    );

  // Subscribe to get values
    squareOdd.subscribe(x => console.log(x)); // 1.9.25

  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
