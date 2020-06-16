import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
import { EmailSignatureComponent } from './email-signature/email-signature.component';


const routes: Routes = [
  {path:'', redirectTo: '/', pathMatch:'full'},
  {path: 'nav', component: NavBarComponent},
  {path:'register', component: UserComponent},
  { path:'user-list', component:UserListComponent},
  {path: 'template', component: EmailSignatureComponent},
  {path:'login' , component: UserProfileComponent, canActivate :[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
