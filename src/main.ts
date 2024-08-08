import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  Route,
  RouterModule,
  withComponentInputBinding,
} from '@angular/router';
import 'zone.js';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList, MatListItem } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface PeriodicElement {
  name: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', action: '' },
  { name: 'Helium', action: '' },
  { name: 'Lithium', action: '' },
  { name: 'Beryllium', action: '' },
  { name: 'Boron', action: '' },
  { name: 'Carbon', action: '' },
  { name: 'Nitrogen', action: '' },
  { name: 'Oxygen', action: '' },
  { name: 'Fluorine', action: '' },
  { name: 'Neon', action: '' },
];

// Root Component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<div class="container">
  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <img src="https://t3.ftcdn.net/jpg/05/07/66/58/360_F_507665856_dFXIKJJ4SwROG0df8GNPBhqsZV44p6jn.jpg" width="75" height="75" /></a>
    <ul class="nav nav-pills">
      <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
      <li class="nav-item"><a href="#" class="nav-link">About</a></li>
    </ul>
  </header>
  <router-outlet /></div>`,
})
export class App {
  name = 'Angular';
}

// Home Component
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="example-container"><form>
    <div class="example-form-fields">
        <mat-form-field [floatLabel]="floatLabel()">
          <mat-select required>
            <mat-option value="">Select State</mat-option>
            <mat-option value="option">Option</mat-option>
          </mat-select>
          <mat-label><mat-icon>favorite</mat-icon> <strong> US</strong>&nbsp;<em>state</em></mat-label>
        </mat-form-field>
        <mat-form-field [floatLabel]="floatLabel()">
          <mat-label>US University</mat-label>
          <input matInput placeholder="Enter Name" />
        </mat-form-field>
        </div>
          <button mat-flat-button>
            <mat-icon>search</mat-icon>
            Search
          </button>
        </form>
        <table mat-table [dataSource]="dataSource" matSort (matSortChange)="announceSortChange($event)" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header sortActionDescription="Sort by name">Name</th>
          <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element"> <button mat-icon-button color="primary" (click)="forwardLink(element.name)">View Detail</button> </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>        
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator></div>`,
})
export class HomeComponent implements AfterViewInit {
  readonly floatLabelControl = new FormControl('always' as FloatLabelType);
  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map((v) => v || 'always')),
    { initialValue: 'always' }
  );
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  forwardLink(elementName: string): void {
    this.router.navigate(['detail', elementName]);
  }
}

// Detail Component
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatListItem, MatToolbarModule],
  template: `<mat-sidenav-container autosize>
    <mat-sidenav class="example-sidenav" mode="side" opened="true">
      <mat-nav-list>
        <mat-list-item>Item 0</mat-list-item>
        <mat-list-item>Item 1</mat-list-item>
        <mat-list-item>Item 2</mat-list-item>
        <mat-list-item>Item 3</mat-list-item>
        <mat-list-item>Item 4</mat-list-item>
        <mat-list-item>Item 5</mat-list-item>
        <mat-list-item>Item 6</mat-list-item>
        <mat-list-item>Item 7</mat-list-item>
        <mat-list-item>Item 8</mat-list-item>
        <mat-list-item>Item 9</mat-list-item>
      </mat-nav-list>
    </mat-sidenav>
    <div class="example-sidenav-content">
      Main content that resizes properly
    </div>
    </mat-sidenav-container>`,
})
export class DetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}

const APP_ROUTES: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'detail/:name', component: DetailComponent },
];

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
});
