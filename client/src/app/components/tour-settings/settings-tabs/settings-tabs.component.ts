import { Component, ElementRef, ViewContainerRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { EmployeeService } from '../../../services/employee.service';
import { TourService } from '../../../services/tour.service';
import { AuthService } from '../../../services/auth.service';
import { MapCreatorService } from '../select-manage/select-place/map/mapCreator.service';
import { TourSpinnerCreatorService } from '../tour-spinner/tour-spinner-creator.service';

import { User } from '../../../models/user.model';
import { Tour } from "../../../models/tour.model";
import { Place } from "../../../models/place.model";

import { endDateValidator, startDateValidator, validateCreatedTour } from "../../../utils/validators/createTourValidator";

import {Subscription} from "rxjs";
@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html',
  styleUrls: ['./settings-tabs.component.scss']
})
export class SettingsTabsComponent implements OnInit, OnDestroy {

  @ViewChild('overview') overview: ElementRef;
  @ViewChild('overviewLabel') overviewLabel: ElementRef;

  @ViewChild('info') info: ElementRef;
  @ViewChild('logo') logo: ElementRef;
  @ViewChild('attachments') attachments: ElementRef;
  @ViewChild('manage') manage: ElementRef;

  @ViewChild('mapZone') mapZone: ElementRef;

  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  @ViewChild('spinner', {
    read: ViewContainerRef
  }) viewContainerSpinnerRef: ViewContainerRef;


  public CreateTourForm : FormGroup;

  private selectedEmployees: User[] = [];
  private employees: User[] = [];
  public selectedPlaces: Place[];
  private selectedTour: Tour;

  private currentUser;
  private isValid = {};

  private MODE: string = 'create';
  public isInvitation = false;

  private spinner = {
    show: () => {},
    hide: () => {}
  };

  private generateDocFile: boolean = false;

  private _createTour: Subscription;
  private _formValueChange: Subscription;
  private _getEmployees: Subscription;

  constructor( private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private staff: EmployeeService,
               private tour: TourService,
               private auth: AuthService,
               private mapCreator: MapCreatorService,
               private spinnerCreator: TourSpinnerCreatorService ) {

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
          ])),
        avatar:  [''],
        tourFiles:  [''],
      }
    );
  }

  generateDoc($event){
    this.generateDocFile = $event;
  }

  placeWasSelected($event){
    this.isValid = validateCreatedTour(this.CreateTourForm.value,this.staff.staffInTour, $event);
    this.selectedPlaces = this.tour.selectedPlaces;
  }

  selectEmployee(employee){
    this.staff.staffInTour = employee;
    this.staff.selectStaff(employee);
    this.employees = this.staff.employees;
    this.isValid = validateCreatedTour(this.CreateTourForm.value,this.staff.staffInTour, this.tour.selectedPlaces);
    this.selectedEmployees = this.staff.staffInTour;
  }

  deleteSelectedEmployee(employee){
    this.staff.deleteFromSelected(employee.id);
    this.selectedEmployees = this.staff.staffInTour;
    this.employees.push(employee);
    this.selectedEmployees = this.staff.staffInTour;
  }

  openOverview(){
    this.enableOverview();
    this.openMain();
    this.overview.nativeElement.checked = true;

    this.logo.nativeElement.disabled = true;
    this.info.nativeElement.disabled = true;
    this.attachments.nativeElement.disabled = true;
    this.manage.nativeElement.disabled = true;
  }

  openMain() {
    this.mapCreator.setRootViewContainerRef(this.viewContainerRef)
    this.mapCreator.addDynamicComponent();
  }

  edit() {
    this.logo.nativeElement.disabled = false;
    this.info.nativeElement.disabled = false;
    this.attachments.nativeElement.disabled = false;
    this.manage.nativeElement.disabled = false;

    this.info.nativeElement.checked = true;
    this.disableOverview();
    this.removeComponent();
  }

  removeComponent(){
    try{
      this.viewContainerRef.remove();
    }
    catch(e){
      console.error(e);
    }
  }

  disableOverview(){
    this.overview.nativeElement.disabled = true;
    this.overviewLabel.nativeElement.style.display = 'none';
  }

  enableOverview(){
    this.overview.nativeElement.disabled = false;
    this.overviewLabel.nativeElement.style.display = 'block';
  }

  submitForm(){
    this.spinner.show();

    const formData = new FormData();
    formData.append('logo', this.CreateTourForm.controls.avatar.value);
    formData.append('startDate', this.CreateTourForm.controls.startDate.value);
    formData.append('endDate', this.CreateTourForm.controls.endDate.value);
    formData.append('name', this.CreateTourForm.controls.name.value);
    formData.append('description', this.CreateTourForm.controls.description.value);
    formData.append('staff', JSON.stringify(this.selectedEmployees));
    formData.append('places', JSON.stringify(this.selectedPlaces));
    formData.append('generateDocFile', JSON.stringify(this.generateDocFile) );

    this._createTour = this.tour.createTour(formData).subscribe(
          () => {
            this.spinner.hide();
            this.staff.cleanStaff();
            this.tour.cleanPlaces();
            this.router.navigate(['board']);
          },
          (err) => console.log(err));
  }

  approveInvitation(tourId, value){
    this.spinner.show();
    this.staff.changeInvitation(tourId, { "invitationStatus": value}).subscribe(() => {
      this.staff.cleanStaff();
      this.tour.cleanPlaces();
      this.spinner.hide();
      this.router.navigate(['/board'])
    })
  }

  rejectInvitation(tourId, value){
    this.spinner.show();
    this.staff.changeInvitation(tourId, { "invitationStatus": value}).subscribe(() => {
      this.staff.cleanStaff();
      this.tour.cleanPlaces();
      this.spinner.hide();
      this.router.navigate(['/board'])
    })
  }

  getCurrentTour(id) {
    this.tour.getTour(id).subscribe((tour) => {
      this.MODE = 'update';
      this.selectedTour = tour;
      this.CreateTourForm.controls.startDate.setValue(this.selectedTour.startDate);
      this.CreateTourForm.controls.endDate.setValue(this.selectedTour.endDate);
      this.CreateTourForm.controls.name.setValue(this.selectedTour.name);
      this.CreateTourForm.controls.description.setValue(this.selectedTour['description']);

      this.generateDocFile = this.selectedTour.generateDocFile;

      this.selectedTour.staff.map((user) => {

        const { id, firstname, lastname, status, gender, email, birth, createdAt, role, avatar, info,
          roleInTour: { roleInCompany : { company, job } } } = user;

        const prettyUser = {
          id,
          name: { firstname, lastname },
          birth,
          gender,
          email,
          registrationDate: createdAt,
          avatar,
          company,
          job: job,
          status,
          payment: info['payment'],
          role: role['role'],
          invitationStatus: info['invitationStatus']
        };
        // @ts-ignore
        this.staff.staffInTour = prettyUser;
        this.staff.selectStaff(prettyUser);
        // this.staff.deleteFromSelected(prettyUser.id);
        this.employees = this.staff.employees;
        this.isValid = validateCreatedTour(this.CreateTourForm.value,this.staff.staffInTour, this.tour.selectedPlaces);
        this.selectedEmployees = this.staff.staffInTour;
      });

      this.selectedTour.places.map((place) => {
        this.tour.selectPlace(place);
      });
      this.openOverview();
      setTimeout(() => this.spinner.hide(), 1000);
    });
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;

    this.spinner.show = () => {
      this.spinnerCreator.setRootViewContainerRef(this.viewContainerSpinnerRef);
      this.spinnerCreator.addDynamicComponent();
    };

    this.spinner.hide = () => {
      this.viewContainerSpinnerRef.remove();
    };

    this.spinner.show();

    this.route.url.subscribe((url) => {
      let flag = url.find((item) => item.path === 'invitation');
      if(flag) this.isInvitation = true;
    });

    this.route.params.subscribe(
      (param) => {
        if(param.id){
          this.getCurrentTour(param.id);
          this.selectedEmployees = this.staff.staffInTour;
        } else {
          this.info.nativeElement.checked = true;
          this.disableOverview();
          this.spinner.hide();
        }
      }
    );

    this.spinner.show = () => {
      this.spinnerCreator.setRootViewContainerRef(this.viewContainerSpinnerRef);
      this.spinnerCreator.addDynamicComponent();
    };

    this.spinner.hide = () => {
      this.viewContainerSpinnerRef.remove();
    };

    this.employees = this.staff.employees;
    if(this.employees.length === 0) {
      this._getEmployees = this.staff.getEmployees().subscribe((employees) => {
        this.employees = employees
      })
    }

    this.isValid = validateCreatedTour(this.CreateTourForm.value,this.staff.staffInTour, this.tour.selectedPlaces);
    this._formValueChange = this.CreateTourForm.valueChanges.subscribe(() =>  {
      this.isValid = validateCreatedTour(this.CreateTourForm.value,this.staff.staffInTour, this.tour.selectedPlaces);
    })
  }

  ngOnDestroy(): void {
    this._formValueChange ? this._formValueChange.unsubscribe() : null;
    this._createTour ? this._createTour.unsubscribe() : null;
    this._getEmployees ? this._getEmployees.unsubscribe() : null;
  }
}
