import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy{

  currentUserSubscription: Subscription = new Subscription();
  currentUserName: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.currentUserSubscription =
    this.store
      .select('auth')
      .pipe(filter( auth => auth.user !== null))
      .subscribe(auth => {
        this.currentUserName = auth.user.name;
      });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
