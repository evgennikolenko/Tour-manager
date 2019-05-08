import { Observable } from 'rxjs';

export function validateCreatedTour(form, staffs, places) {

  const startDate = new Date(form.startDate);
  const endDate = new Date(form.endDate);

  if(!form.name){
    return { error: 'Tour must have name'}
  }

  if(!form.description){
    return { error: 'Tour must have description'}
  }

  if(!(startDate instanceof Date && !isNaN(startDate.valueOf()))) {
    return { error: 'Start date is not valid'}
  }
  if(!(endDate instanceof Date && !isNaN(endDate.valueOf()))) {
    return { error: 'End date is not valid'}
  }

  if(staffs.length === 0) {
    return { error: 'Select staffs!'}
  }

  if(places.length === 0) {
    return { error: 'Select places!'}
  }

  return !!((startDate instanceof Date && !isNaN(startDate.valueOf()))
    && (endDate instanceof Date && !isNaN(endDate.valueOf()))
    && staffs.length !== 0 && places.length !== 0 &&
    form.name && form.description);
}

export function startDateValidator(control) {
  const startDate = new Date(control.value);
  const now = new Date();
  const endDate = new Date(control.parent.controls.endDate.value);

  if(now > startDate) {
    return new Observable((observer) => {
      observer.next({ message: 'Start date cannot be before now'});
      observer.complete()
    })
  }  else if(endDate && (endDate < startDate)) {
    return new Observable((observer) => {
      observer.next({ message: 'Start date cannot be after end date'});
      observer.complete()
    })
  } else {
    return new Observable((observer) => {
      observer.next(true);
      observer.complete()
    })
  }
}

export function endDateValidator(control) {

  const endDate = new Date(control.value);
  const now = new Date();

  const startDate = new Date(control.parent.controls.startDate.value);

  const isOneDay = startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth()
  && endDate.getFullYear() && startDate.getFullYear();

  if(startDate && (endDate < startDate)) {
    return new Observable((observer) => {
      observer.next({ message: 'End date cannot be before start date'});
      observer.complete()
    })
  } else if(now > endDate) {
      return new Observable((observer) => {
        observer.next({ message: 'End date cannot be before now'});
        observer.complete()
      })
  } else if(isOneDay) {
    return new Observable((observer) => {
      observer.next({ message: 'Tour cannot continue less as 1 day'});
      observer.complete()
    })
  } else {
    return new Observable((observer) => {
      observer.next(true);
      observer.complete()
    })
  }
}
