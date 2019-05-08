import {Component, Input, OnInit} from '@angular/core';
import {Form} from "@angular/forms";

@Component({
  selector: 'app-select-logo',
  templateUrl: './select-logo.component.html',
  styleUrls: ['./select-logo.component.scss']
})
export class SelectLogoComponent implements OnInit {
  @Input() createForm: Form;

  private selectedFile: File;
  constructor() { }

  upload(event) {
    this.selectedFile = event.target.files[0];
    this.createForm['controls'].avatar.setValue(this.selectedFile);
  }

  ngOnInit() {
  }

}
