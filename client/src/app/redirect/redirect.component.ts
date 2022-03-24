import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: 'redirecting...',
})
export class RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    window.location.href = 'http://www.localhost.com/' + token;
  }
}
