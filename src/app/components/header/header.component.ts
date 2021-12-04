import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    accountMenu: boolean = true;
    userImgURL!: string;
    user: any;
    isAuth!: boolean;
    displayDashbrd: boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

    toggleMenu() {}

    goToUserProfile() {}

    logOut() {}

    isAdmin() {}

}
