import { Rendezvous } from './../../../models/rendezvous';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-rdvs',
    templateUrl: './rdvs.component.html',
    styleUrls: ['./rdvs.component.css']
})
export class RdvsComponent implements OnInit {

    id: string = '';
    rdv!: Rendezvous;
    rdvForm: FormGroup;
    rdvsList!: Observable<Rendezvous[]>;
    firebaseErrorMessage!: string;
    tHead: string[] = ['Order', 'Full Name', 'Phone Number', 'Created At', 'Last update'];

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private dtbaseService: DatabaseService
    ) {
        this.rdvForm = this.formBuilder.group({
            displayName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
            phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
        });
    }

    ngOnInit(): void {
        this.getRDVsList();
    }

    getRDVsList() {
        this.rdvsList = this.dtbaseService.getRDVsList();
    }

    onSubmitForm() {
        if (this.rdvForm.invalid) return;
        this.rdv = this.rdvForm.value;
        if (this.id === '') {
            this.rdv.created_at = new Date();
            this.rdv.created_by = this.authService.currentUserProfile.email;
            this.dtbaseService.createNewRDV(this.rdv)
            this.rdvForm.reset();
        } else {
            this.rdv.lastUpdate = new Date();
            this.dtbaseService.updateRDV(this.id, this.rdv);
            this.rdvForm.reset();
            this.id = '';
        }
    }

    onUpdateIcon(rdv: any) {
        this.rdvForm = this.formBuilder.group({
            displayName: [rdv.displayName, [Validators.required]],
            phoneNumber: [rdv.phoneNumber, Validators.required]
        });
        this.id = rdv.rdvID;
    }

    emptyList() {
        let list = this.rdvsList as unknown as Array<any>;
        if (list.length === 0) return true;
        else return false;
    }

    onDelete = (data: any) => this.dtbaseService.deleteRDV(data);

    checkUserPermission(rdv: any): boolean {
        let role = this.authService.currentUserProfile.role;
        let userEmail = this.authService.currentUserProfile.email;
        let rdvEmail = rdv.created_by;
        if (userEmail === rdvEmail || role === 'admin' || role === 'editor') return true;
        else return false;
    }

    resetForm() {
        this.id = '';
        this.rdvForm.reset();
    }
}

// THE END.



/*

datePipe: string = 'MMMM d, y - hh:mm aa';

*/