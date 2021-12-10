import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSpaceRoutingModule } from './user-space-routing.module';
import { UserSpaceComponent } from './user-space.component';
import { RdvsComponent } from './rdvs/rdvs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UserSpaceComponent,
    RdvsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserSpaceModule { }
