import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gn-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    title = 'Dashboard';

    constructor() {
    }

    ngOnInit() {
    }
}
