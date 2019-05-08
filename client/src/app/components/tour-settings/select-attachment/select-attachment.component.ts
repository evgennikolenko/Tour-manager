import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Form} from "@angular/forms";

import * as $ from 'jquery';

@Component({
  selector: 'app-select-attachment',
  templateUrl: './select-attachment.component.html',
  styleUrls: ['./select-attachment.component.scss']
})
export class SelectAttachmentComponent implements OnInit {
  @Input() generateDocFile;
  @Input() createForm: Form;
  @Output() generateDoc = new EventEmitter();

  @ViewChild('loader') loader;
  @ViewChild('matIcon') matIcon;

  constructor() { }

  generate(){

    this.generateDoc.emit(true);

    setTimeout(() => {
      this.loader.nativeElement.style.display = 'none';
      $('.matIcon').css({"visibility":"visible"});
    }, 1000);
  }

  upload() {}

  ngOnInit() {}

}
