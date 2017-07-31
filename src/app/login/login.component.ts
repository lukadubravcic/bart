import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})

export class LoginComponent {
    
    model: any = {};
    loading = false;
    returnUrl: string;
    
    
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        
    }

    login() {

    }

}