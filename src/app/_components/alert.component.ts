import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '@app/_models';
import { AlertService } from '@app/_services';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    // sub to new alert notifs
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        // clear alerts
        if (!alert.message) {
          // filter out alerts without flag
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);
        }
      });
  }
}
