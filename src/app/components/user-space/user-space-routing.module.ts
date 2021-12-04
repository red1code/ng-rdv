import { ProfileComponent } from './profile/profile.component';
import { RdvsComponent } from './rdvs/rdvs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSpaceComponent } from './user-space.component';

const routes: Routes = [
    { path: '', component: UserSpaceComponent },
    { path: 'rendezvous', component: RdvsComponent },
    { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserSpaceRoutingModule { }
