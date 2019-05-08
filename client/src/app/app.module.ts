import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { AppRoutingModule } from './app-routing.module';

import { TokenInterceptor } from './utils/http/token.interceptor'

import { AppComponent } from './app.component';
import { RegistrationComponent } from './containers/check-in/registration/registration.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule, MatFormFieldModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {MatNativeDateModule} from '@angular/material';

import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { BoardComponent } from './containers/board/board.component';
import { LoginComponent } from './containers/check-in/login/login.component';
import { TourBoardComponent } from './components/tour-board/tour-board.component';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { StaffManageDialog } from './components/create-tour/manage-staff-dialog.component';
import { PlaceManageDialog } from './components/create-tour/manage-place-dialog.component';
import { PlaceMapComponent } from './components/create-tour/place-map/place-map.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MoneyPanelComponent } from './components/money-panel/money-panel.component';
import { InvitationEmployeeComponent } from './components/invitation-employee/invitation-employee.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { SocketService } from './services/socket.service';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { PizzaPartyComponent } from './components/notification-modal/notification-modal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckInComponent } from './containers/check-in/check-in/check-in.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TourSettingsComponent } from './components/tour-settings/tour-settings/tour-settings.component';
import { TourWindowComponent } from './components/tour-settings/tour-window/tour-window.component';
import { SettingsTabsComponent } from './components/tour-settings/settings-tabs/settings-tabs.component';
import { SelectInfoComponent } from './components/tour-settings/select-info/select-info.component';
import { SelectLogoComponent } from './components/tour-settings/select-logo/select-logo.component';
import { MapComponent } from './components/tour-settings/select-manage/select-place/map/map.component';
import { PlacesComponent } from './components/tour-settings/select-manage/select-place/places/places.component';
import { SelectPalcesComponent } from './components/tour-settings/select-manage/select-place/select-palces/select-palces.component';
import { SelectEmployeesComponent } from './components/tour-settings/select-manage/select-employees/select-employees/select-employees.component';
import { SelectedEmployeesComponent } from './components/tour-settings/select-manage/select-employees/selected-employees/selected-employees.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WorldClockComponent } from './components/tour-settings/tour-overview/world-clock/world-clock.component';
import { ClockComponent } from './components/tour-settings/tour-overview/clock/clock.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { WeatherComponent } from './components/tour-settings/tour-overview/weather/weather.component';
import { WeatherInCityComponent } from './components/tour-settings/tour-overview/weather-in-city/weather-in-city.component';
import { MapCreatorService } from './components/tour-settings/select-manage/select-place/map/mapCreator.service';
import { TourSpinnerCreatorService } from './components/tour-settings/tour-spinner/tour-spinner-creator.service';

import { MainMapComponent } from './components/tour-settings/tour-overview/main-map/main-map/main-map.component';
import { StaffListComponent } from './components/tour-settings/tour-overview/staff-list/staff-list.component';
import { SelectAttachmentComponent } from './components/tour-settings/select-attachment/select-attachment.component';
import { TourSpinnerComponent } from './components/tour-settings/tour-spinner/tour-spinner.component';
import { RolePipe } from './pipes/role.pipe';
import { RoleDirective } from './derictives/role.directive';
import { EmployeeRoleDirective } from './derictives/employee-role.directive'


export function getToken() {
  return localStorage.getItem('auth-token');
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('auth-token'),
    // throwNoTokenError: true,
    skipWhenExpired: true
  }
};

const socketConfig: SocketIoConfig = { url: 'http://localhost:9000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BoardComponent,
    LoginComponent,
    TourBoardComponent,
    CreateTourComponent,

    StaffManageDialog,
    PlaceManageDialog,
    PlaceMapComponent,
    MoneyPanelComponent,
    InvitationEmployeeComponent,
    NotificationModalComponent,
    PizzaPartyComponent,
    UserProfileComponent,
    ProfileAvatarComponent,
    CheckInComponent,
    NavigationComponent,
    TourSettingsComponent,
    TourWindowComponent,
    SettingsTabsComponent,
    SelectInfoComponent,
    SelectLogoComponent,
    MapComponent,
    PlacesComponent,
    SelectPalcesComponent,
    SelectEmployeesComponent,
    SelectedEmployeesComponent,
    WorldClockComponent,
    ClockComponent,
    WeatherComponent,
    WeatherInCityComponent,
    MainMapComponent,
    StaffListComponent,
    SelectAttachmentComponent,
    TourSpinnerComponent,
    RolePipe,
    RoleDirective,
    EmployeeRoleDirective
  ],
  entryComponents: [StaffManageDialog, PlaceManageDialog, MapComponent, TourSpinnerComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options),
    SocketIoModule.forRoot(socketConfig),
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    BrowserAnimationsModule,

    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDividerModule,
    MatRadioModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTreeModule,
    NgxSpinnerModule
  ],
  exports: [
    MatDatepickerModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    ScrollingModule,
    DragDropModule,
    CdkTreeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, SocketService, MapCreatorService, TourSpinnerCreatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
