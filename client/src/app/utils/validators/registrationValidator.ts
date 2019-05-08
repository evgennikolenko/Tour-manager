import { Observable } from 'rxjs';

export function dateValidator(control) {

  const selectDate = new Date(control.value);
  const now = new Date();

  const minAge = 16;
  const maxAge = 99;

  if(!(selectDate instanceof Date && !isNaN(selectDate.valueOf()))) {
    return new Observable((observer) => {
      observer.next({ message: 'End date is not valid'});
      observer.complete()
    })
  } else if(now.getFullYear() - selectDate.getFullYear() < minAge) {
    return new Observable((observer) => {
      observer.next({ message: 'You must have more 16 age'});
      observer.complete()
    })
  } else if(now.getFullYear() - selectDate.getFullYear() > maxAge) {
    return new Observable((observer) => {
      observer.next({ message: 'You must have less 99 age'});
      observer.complete()
    })
  } else {
    return new Observable((observer) => {
      observer.next(true);
      observer.complete()
    })
  }

}
