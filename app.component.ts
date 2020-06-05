import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';

  ngOnInit() {
    //Observables

    of(2, 4, 6, 8).subscribe(console.log);

    from([20, 15, 10, 5]).subscribe(
      item => console.log(`resulting item .. ${item}`),
      err => console.log(`error occurred ${err}`),
      () => console.log(`complete`)
    );

    of('Apple1', 'Apple2', 'Apple3').subscribe(
      apple => console.log(`Apple was emitted ${apple}`),
      err => console.log(`error occurred ${err}`),
      () => console.log(`No more apples, go home`)
    );

    console.log("using map");
    of(2, 4, 6)
      .pipe(
        map(item => item * 2)
      ).subscribe(console.log);

    console.log("using tap");
    of(2, 4, 6)
      .pipe(
        tap(item => console.log(item)),
        map(item => item * 2)
      ).subscribe(console.log);

    console.log("using take");
    of(2, 4, 6)
        .pipe(
          take(2)
    ).subscribe(console.log);


    from([20, 15, 10, 5])
      .pipe(
        tap(item => console.log(`emitted item .... ${item}`)),
        map(item => item * 2),
        map(item => item - 10),
        map(item => {
          if (item == 0){
            throw new Error('zero detected');
          }
          return item;
        }),
        take(4) //switch to 3 to see 'complete'
      ).subscribe(
        item => console.log(`resulting item .. ${item}`),
        err => console.log(`error occurred ${err}`),
        () => console.log(`complete`)
      );        


  }

}
