import {Component, OnInit, AfterViewInit, DoCheck, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog} from '@angular/material';

import { TourService } from '../../services/tour.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { StaffManageDialog } from './manage-staff-dialog.component';
import { PlaceManageDialog } from './manage-place-dialog.component';

import { Place } from '../../models/place.model';
import { User } from '../../models/user.model';

import { validateCreatedTour, startDateValidator, endDateValidator } from '../../utils/validators/createTourValidator';
import {Tour} from "../../models/tour.model";

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})

export class CreateTourComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  CreateTourForm : FormGroup;
  formSubmitted: boolean;
  private formError;

  private isInvitation: boolean = false;

  MODE: string = 'create';

  private role: string;
  private currentUser;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private tour: TourService,
               private auth: AuthService,
               private employee: EmployeeService,
               public dialog: MatDialog) { }

  private placesList: Place[] = [];
  private staffList: User[] =[];
  private selectedTour: Tour;

  createCancel(){
    // this.tour.cleanPlaces();
    // this.tour.cleanStaff();
    this.router.navigate(['/board'])
  }

  submitForm(form){
    const isValid = validateCreatedTour(form.value, this.staffList, this.placesList);
    console.log('this.staffList', this.staffList);
    if(isValid['error']) {
      this.formError = isValid['error'];
    } else {
      this.formSubmitted = true;
      if(this.MODE === 'create') {

        this.tour.createTour({
          ...form.value,
          staff: this.staffList,
          places: this.placesList
        }).subscribe(
          () => this.closeCreatePage(form),
          (err) => console.log(err)
        )
      } else {
        this.tour.updateTour( this.selectedTour.id,{
          ...form.value,
          staff: this.staffList,
          places: this.placesList
        }).subscribe(
          () => this.closeCreatePage(form),
          (err) => console.log(err)
        )
      }
    }
  }

  ngOnInit() {
    this.role = this.auth.getRole();
    this.currentUser = this.auth.currentUser;

    // check on invitation
    this.route.url.subscribe((url) => {
      let flag = url.find((item) => item.path === 'invitation');
      if(flag) this.isInvitation = true;
    });

    this.route.params.subscribe(
      (param) => {
        if(param.id){
          this.getCurrentTour(param.id);
        }
      }
    );

      this.CreateTourForm = this.fb.group(
        {
          startDate:  new FormControl('', Validators.required, startDateValidator),
          endDate:  new FormControl('', Validators.required, endDateValidator),
          name: new FormControl('',
            Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z][a-zA-Z\\.]{1,155}$'),
              Validators.maxLength(155)
            ])),
          description:  new FormControl('',
            Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z][a-zA-Z\\.]{1,255}$'),
              Validators.maxLength(255)
            ]))
        }
      );
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.tour.cleanPlaces();
    this.tour.cleanStaff();
  }

  approveInvitation(tourId, value){
    console.log('app', tourId, value)
    this.employee.changeInvitation(tourId, { "invitationStatus": value}).subscribe(() => {
      // this.tour.cleanStaff();
      // this.tour.cleanPlaces();
      this.router.navigate(['/board'])
    })
  }

  rejectInvitation(tourId, value){
    console.log(value)
    this.employee.changeInvitation(tourId, { "invitationStatus": value}).subscribe(() => {
      // this.tour.cleanStaff();
      // this.tour.cleanPlaces();
      this.router.navigate(['/board'])
    })
  }

  ngAfterViewInit(): void {
    this.placesList = this.tour.selectedPlaces;
    this.staffList = this.tour.selectedEmployees;
    console.log('staffList', this.staffList)
  }

  ngDoCheck() {
    this.placesList = this.tour.selectedPlaces;
    this.staffList = this.tour.selectedEmployees;
  }

  getCurrentTour(id) {
    this.tour.getTour(id).subscribe((tour) => {
      this.MODE = 'update';
      this.selectedTour = tour;

      this.CreateTourForm.controls.startDate.setValue(this.selectedTour.startDate);
      this.CreateTourForm.controls.endDate.setValue(this.selectedTour.endDate);
      this.CreateTourForm.controls.name.setValue(this.selectedTour.name);
      this.CreateTourForm.controls.description.setValue(this.selectedTour['description']);

      this.selectedTour.staff.map((user) => {
        console.log('user', user)
        const prettyUser = {
          name: {
            firstname: user.firstname,
            lastname: user.lastname,
          },
          payment: user.info['payment'],
          invitationStatus: user.info['invitationStatus'],
          ...user
        };
        delete prettyUser['info'];
        delete prettyUser['firstname'];
        delete prettyUser['lastname'];
        this.tour.selectStaffInTour(prettyUser);
      });

      this.selectedTour.places.map((place) => {
        this.tour.selectPlace(place);
      })
    });
  }

  closeCreatePage(form){
    form.reset();
    this.formSubmitted = false;
    this.tour.cleanStaff();
    this.tour.cleanPlaces();
    this.router.navigate(['/board'])
  }

  openManageStaffDialog(): void {
    const dialogRef = this.dialog.open(StaffManageDialog, {
      width: '90%',
      height: '90vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openManagePlaceDialog(): void {
    const dialogRef = this.dialog.open(PlaceManageDialog, {
      width: '90%',
      height: '90vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
