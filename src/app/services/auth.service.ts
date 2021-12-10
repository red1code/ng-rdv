import { User } from './../models/user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUserProfile!: User;

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private fireStore: AngularFirestore,
        private storage: AngularFireStorage
    ) {
        this.getCurrentUserProfile();
    }

    async createNewUser(user: User, userPassword: string): Promise<any> {
        return await this.auth.createUserWithEmailAndPassword(user.email, userPassword)
            .then((result: any) => {
                result.user.sendEmailVerification();
                user.role = 'subscriber';
                user.uid = result.user.uid;
                user.created_at = new Date();
                user.imageURL = 'assets/unknown-profile-picture.png';
                this.fireStore.doc('/profiles/' + user.uid).set(user)
            }).catch((error): any => {
                console.log('Auth Service: signup error', error);
                if (error.code)
                    return {
                        isValid: false,
                        message: error.message,
                        code: error.code
                    };
            });
    }

    async loginUser(email: string, password: string): Promise<any> {
        return await this.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Auth Service: user logged in successfully');
                this.router.navigate(['/user-space']);
            })
            .catch((error): any => {
                console.log('Auth Service: login error...');
                console.log('error code: ', error.code);
                console.log('error: ', error.message);
                if (error.code)
                    return {
                        isValid: false,
                        message: error.message,
                        code: error.code
                    };
            });
    }

    async resendVerificationEmail() {   // verification email is sent in the Sign Up function, but if you need to resend, call this function
        return (await this.auth.currentUser)?.sendEmailVerification()
            .then(() => {
                // some code here;
            })
            .catch(error => {
                console.log('Auth Service: sendVerificationEmail error...');
                console.log('error code: ', error.code);
                console.log('error: ', error.message);
                if (error.code) return error;
            });
    }

    async resetPassword(email: string): Promise<any> {
        return await this.auth.sendPasswordResetEmail(email)
            .then(() => console.log('Auth Service: reset password success'))
            .catch(error => {
                console.log('Reset password error :');
                console.log('error code: ', error.code);
                console.log('error: ', error.message)
                if (error.code) return error;
            });
    }

    async logoutUser(): Promise<void> {
        return await this.auth.signOut()
            .then(() => this.router.navigate(['/auth']))   // when the user is logged out, navigate him out :)
            .catch(error => {
                console.log('Auth Service: logout error...');
                console.log('error code: ', error.code);
                console.log('error: ', error.message);
                if (error.code) return error;
            });
    }

    getCurrentUserProfile() {
        return this.auth.onAuthStateChanged((usr: any) => {
            if (usr) {
                this.fireStore.collection('profiles').doc(usr.uid).valueChanges()
                    .subscribe((result: any) => {
                        this.currentUserProfile = result;
                    })
            }
        })
    }

    getProfilesList = () => this.fireStore.collection('profiles').valueChanges();

    deleteCurrentUser() {
        this.auth.currentUser.then((usr: any) => {
            let uid = usr?.uid;
            // we must delete user's profile first
            this.fireStore.collection('profiles').doc(uid).valueChanges()
                .subscribe((result: any) => {
                    // we must delete prfile picture to clean database
                    let imgURL = result.imageURL;
                    let picPath = imgURL.slice(0, 6);
                    // checking if the picture is in firebase storage or not
                    if (picPath !== "assets") {
                        this.storage.storage.refFromURL(imgURL).delete()
                            .then(() => this.fireStore.collection('profiles')
                                .doc(uid).delete().then(() => usr?.delete()))
                    } else {
                        this.fireStore.collection('profiles').doc(uid).delete()
                            .then(() => usr?.delete())
                    }
                })
        })
    }

    deleteUserWithID(id: string) { }
}
