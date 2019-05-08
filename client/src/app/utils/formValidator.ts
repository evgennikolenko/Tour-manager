import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

export class RegistrationFormControl extends FormControl {
  label : string;
  property: string;

  constructor(label: string, property: string , value: any, validator: any ){
    super( value, validator);
    this.label = label;
    this.property = property;
  }

  getValidationMessages() {
    let messages : string[] = [];

    if ( this.errors) {
      for ( let err in this.errors){
        switch (err) {
          case "required" :
            messages.push(`Enter ${this.property}`);
            break;
          case "minlength":
            messages.push(`A ${this.label} must be at least
                        ${this.errors['minlength'].requiredLength}
                        characters`);
            break;
          case "maxlength":
            messages.push(`A ${this.label} must be no more than
                        ${this.errors['maxlength'].requiredLength}
                        characters`);
            break;
          case "pattern":
            messages.push(`The ${this.label} contains illegal characters`);
            break;
        }
      }
    }
    return messages;
  }
}

