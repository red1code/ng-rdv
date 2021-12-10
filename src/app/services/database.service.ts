import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Rendezvous } from '../models/rendezvous';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private fireStore: AngularFirestore) { }

    // rdvs methods
    createNewRDV(data: any) {
        return new Promise<any>(() => {
            this.fireStore.collection<Rendezvous>('rdvsList').add(data);
        });
    }

    getRDVsList() {
        return this.fireStore.collection<Rendezvous>('rdvsList', ref => ref.orderBy('created_at'))
            .snapshotChanges().pipe(map(actions => {
                let i = 1;
                return actions.map(rdv => {
                    let load = rdv.payload.doc.data();
                    return {
                        rdvID: rdv.payload.doc.id,
                        ...load,
                        created_at: load.created_at.toDate().toLocaleString(),
                        lastUpdate: load.lastUpdate ? load.lastUpdate.toDate().toLocaleString() :
                            'Not updated',
                        order: i++
                    }
                })
            }))
    }

    updateRDV(id: string, rdv: Rendezvous) {
        return new Promise(() => {
            this.fireStore.collection<Rendezvous>("rdvsList").doc(id).update(rdv);
        })
    }

    deleteRDV(data: Rendezvous) {
        if (confirm(`Are you sure You want to delete ${data.displayName}?`))
            this.fireStore.collection<Rendezvous>("rdvsList").doc(data.rdvID).delete();
    }

    // users methods
    getProfilesList() {
        return this.fireStore.collection<User>('profiles', ref => ref.orderBy('created_at'))
            .snapshotChanges().pipe(map(actions => {
                let i = 1;
                return actions.map(user => {
                    let load = user.payload.doc.data();
                    return {
                        ...load,
                        created_at: load.created_at.toDate().toLocaleString(),
                        order: i++
                    }
                })
            }))
    }

}