import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-info',
  templateUrl: './select-info.component.html',
  styleUrls: ['./select-info.component.scss']
})
export class SelectInfoComponent implements OnInit {
  @Input() createForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
