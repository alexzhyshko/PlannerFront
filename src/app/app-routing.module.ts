import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { UserProfileComponent } from "./auth/user-profile/user-profile.component";
import { HomeComponent } from "./component/home/home.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { SectionComponent } from "./component/section/section.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'signup', component: SignupComponent},
  {path:'login', component: LoginComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'dashboard/:id', component: DashboardComponent},
  {path: 'dashboard/:dashboardid/section/:sectionid', component: SectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
