import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { EntityFormComponent } from '../../entity-form/entity-form.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { AlertComponent } from '../../alert/alert.component';

import { Entity } from '../../models/Entity.model';
import { DatePipe } from '../../pipes/Date.pipe';
import { SortByPipe } from '../../pipes/OrderBy.pipe';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule
} from '@angular/material';
import { last } from 'rxjs/operators';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCheckboxModule
    ],
    declarations: [
        EntityFormComponent,
        TableListComponent,
        AlertComponent,
        DatePipe,
        SortByPipe
    ],
    providers: [Entity]
})

export class AdminLayoutModule { }
