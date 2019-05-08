import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './utils/guard/auth.guard';
import { RoleGuard } from './utils/guard/role.guard';
import { LogInCheckingGuard } from './utils/guard/logInChecking.guard';

import { RegistrationComponent } from './containers/check-in/registration/registration.component';
import { BoardComponent } from './containers/board/board.component';
import { LoginComponent } from './containers/check-in/login/login.component';
import { CheckInComponent } from './containers/check-in/check-in/check-in.component';
import { TourSettingsComponent } from './components/tour-settings/tour-settings/tour-settings.component';

import { CreateTourComponent } from './components/create-tour/create-tour.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LogInCheckingGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tour/create', component: TourSettingsComponent , canActivate: [AuthGuard, RoleGuard] },

      { path: 'tour/update/:id', component: TourSettingsComponent , canActivate: [AuthGuard] },
      { path: 'tour/invitation/:id', component: TourSettingsComponent , canActivate: [AuthGuard] },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'check-in',
    component: CheckInComponent,
    // canActivate: [LogInCheckingGuard]
  },
  {
    path: '**',
    component: BoardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {urlUpdateStrategy: 'eager'}), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
