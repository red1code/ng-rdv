import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    firebaseErrorMessage: string;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private angularFireAuth: AngularFireAuth
    ) {
        // this.isAuthenticate();
        this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
            familyName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
            phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        })
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void { }

    onSubmit() {
        if (this.signupForm.invalid) return;   // if signupForm isn't valid, don't submit it.
        let password = this.signupForm.controls['password'].value;
        let formValues = this.signupForm.value;
        delete formValues.password;
        this.authService.createNewUser(formValues, password).then((result) => {
            if (result == null) this.router.navigate(['/user-space/rendezvous']);   // null is success, false means there was an error    
            else if (result.isValid == false) this.firebaseErrorMessage = result.message;
        });
    }

    isAuthenticate() {
        this.angularFireAuth.onAuthStateChanged(user => {
            user ? this.router.navigate(['/user-space/rendezvous']) : null
        })
    }

}
