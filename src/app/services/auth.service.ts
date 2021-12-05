import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { AngularFireStore } from '@angular/fire/store';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/store';
// import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { User } from 'src/app/models/user';
import {
    Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc,
    DocumentReference, setDoc
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userEmail!: string;
    userID!: string;
    userRole!: string;
    currentUser!: any;
    role!: string;

    constructor(
        private router: Router,
        // private angularFireAuth: AngularFireAuth,
        private fireStore: Firestore,
        // private angularFireStorage: AngularFireStorage
    ) { }

    // metod() {
    //     this.fireStore.
    // }
}
