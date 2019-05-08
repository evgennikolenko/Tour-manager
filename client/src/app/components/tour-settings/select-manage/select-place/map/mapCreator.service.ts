import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core'

import { MapComponent } from './map.component'
// import { MainMapComponent } from './../../../tour-overview/main-map/main-map'

@Injectable()

export class MapCreatorService {

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
      .resolveComponentFactory(MapComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}
