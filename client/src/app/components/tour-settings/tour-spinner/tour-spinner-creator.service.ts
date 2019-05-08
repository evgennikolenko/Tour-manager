import { Injectable,  ComponentFactoryResolver, Inject, } from '@angular/core';
import { TourSpinnerComponent } from './tour-spinner.component';


@Injectable({
  providedIn: 'root'
})
export class TourSpinnerCreatorService {

  factoryResolver;
  rootViewContainer;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent() {
    const factory = this.factoryResolver
      .resolveComponentFactory(TourSpinnerComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}
