import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<ng-progress #progressBar></ng-progress><router-outlet></router-outlet>'
})
export class AppComponent { }
