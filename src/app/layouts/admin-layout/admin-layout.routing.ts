import { AlertComponent } from './../../alert/alert.component';
import { Routes } from '@angular/router';
import { EntityFormComponent } from '../../entity-form/entity-form.component';
import { TableListComponent } from '../../table-list/table-list.component';



export const AdminLayoutRoutes: Routes = [
    { path: '', pathMatch:'full', component: TableListComponent, redirectTo : 'table-list' },
    { path: 'table-list', component: TableListComponent},
    { path: 'entity-form',   component: EntityFormComponent },
    { path: 'user-alert',   component: AlertComponent },
    { path : '**' , redirectTo : 'table-list'}
   
];
