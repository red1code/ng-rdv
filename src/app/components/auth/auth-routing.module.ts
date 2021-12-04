import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPswComponent },
    { path: 'verify-email', component: VerifyEmailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
