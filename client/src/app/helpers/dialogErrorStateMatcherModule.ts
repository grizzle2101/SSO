import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class DialogErrorStateMatcherModule implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      //condition true
      const isSubmitted = form && form.submitted;
      //false
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }