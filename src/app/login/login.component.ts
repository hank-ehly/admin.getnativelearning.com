import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gn-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    credentials = {
        email: '',
        password: ''
    };

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit(): void {
    }
}
