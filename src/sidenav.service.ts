import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private panel!: MatSidenav;
  private viewContainerRef!: ViewContainerRef;

  constructor() {}

  setPanel(sidenav: MatSidenav) {
    this.panel = sidenav;
  }

  setContentVcf(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  private createView(template: TemplateRef<any>) {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(template);
  }

  open(template: TemplateRef<any>) {
    this.createView(template);
    return this.panel.open();
  }

  close() {
    return this.panel.close();
  }

  toggle() {
    return this.panel.toggle();
  }
}
