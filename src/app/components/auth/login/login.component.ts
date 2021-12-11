import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    firebaseErrorMessage: string = '';

    constructor(
        private router: Router,
        private authService: AuthService,
        private angularFireAuth: AngularFireAuth
    ) {
        // this.isAuthenticate();
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
    }

    ngOnInit() { }

    onSubmit() {
        if (this.loginForm.invalid) return;   // if loginForm isn't valid, do not submit it.
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.authService.loginUser(email, password).then((result) => {
            if (result == null) this.router.navigate(['/user-space/rendezvous']);   // null is success.
            else if (result.isValid == false) this.firebaseErrorMessage = result.message;
        });
    }

    isAuthenticate() {
        this.angularFireAuth.onAuthStateChanged(user => {
            user ? this.router.navigate(['/user-space/rendezvous']) : null
        })
    }

}
