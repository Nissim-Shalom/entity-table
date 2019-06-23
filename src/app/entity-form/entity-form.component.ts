import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { IEntity } from '../models/model.interface';
import { Entity } from '../models/Entity.model';
import { AlertComponent } from 'app/alert/alert.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/date-adapter/date.adapter';

//There are 10000 ticks in a millisecond. 
//And 621355968000000000 ticks between 1st Jan 0001 and 1st Jan 1970.
const JSTIME: number = 621355968000000000;

@Component({
    selector: 'app-entity-form',
    templateUrl: './entity-form.component.html',
    styleUrls: ['./entity-form.component.css'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})

export class EntityFormComponent implements OnInit {

    public entityForm: FormGroup; //object for form filed

    public entity: IEntity;       //object to hold entity details
    public headerTitle: string;   //label for header title and submit button 

    onCreate = new EventEmitter();  //fire when create success
    onUpdate = new EventEmitter();  //fire when update success
    
    constructor(
        private entityModel: Entity,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EntityFormComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        // set data from parent component
        // if data is empty object then the form open for create new entity
        // else the form open for update exsit entity    
        this.entity = data;
    }

    ngOnInit() {

        //label for header title and button text
        this.headerTitle = this.entity.Id != null ? 'Update' : 'Add';

        //create form filed for entity details
        this.entityForm =  this.fb.group({
            id: [{value:this.entity.Id, disabled: true}, Validators.required],
            name: [this.entity.Name, 
                [ Validators.required, Validators.maxLength(100)]
            ],
            description: [this.entity.Description],
            date: [this.ticksToDate(this.entity.Date)],
            amount: [this.entity.Amount, this.amountValidator],
            isPrivate: [this.entity.IsPrivate]
        });
    }

    // coustom validetion for amount filed
    // if not number or not Integer number 
    // or the number length greater than 5 digits return error 
    public amountValidator(control: AbstractControl):ValidationErrors | null{

        const amount = control.value;

        if (amount % 1 !== 0) return {notInteger: true};
        else if (amount > 99999) return  {isGreater: true};
        
        else return null;
    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.entityForm.controls[controlName].hasError(errorName);
    }

    //close this dialog when cross icon is clicked
    public closePopup(){
        this.dialogRef.close();
    }

    //update entity details or create new one
    public updateEntity(){

        // declare parameter and set value for http method
        let param : IEntity = {
            Id: this.entity.Id,
            Date: this.dateToTicks(this.entityForm.controls.date.value),
            Amount: this.entityForm.controls.amount.value,
            Description: this.entityForm.controls.description.value,
            Name: this.entityForm.controls.name.value,
            IsPrivate: this.entityForm.controls.isPrivate.value
        }

        let message = 'update success';

        // call http method for update or create entity
        // if entity id equal to null create new one
        // else update deatails by entity id
        this.entityModel.updateEntity(param).subscribe((p: IEntity) => {

                // condition for new entity if true
                // call emit for insert new row in the parent component table
                // and update input id and label in this component
                if (this.entity.Id == null) { 
                    this.onCreate.emit(p);
                    this.entity.Id = p.Id;
                    this.entityForm.get('id').setValue(p.Id);
                    this.headerTitle = 'Update';
                    message = 'create success'
                }
                else { //if false call emit for update entity row in the parent component table 
                    this.onUpdate.emit(p);
                }
               
                // create dialog for message result
                let alert = this.dialog.open(AlertComponent, {
                    height : '100px',
                    width  : '200px'
                });
                
                // set the right message to the dialog
                alert.componentInstance.message = message;
            }
            ,() => {

                message = 'error occourd while update entity from database';

                // create dialog for message result
                let alert = this.dialog.open(AlertComponent, {
                    height : '100px',
                    width  : '450px'
                });
                
                // set the error message to dialog
                alert.componentInstance.message = message;
        }); 
    }

    //Convert ticks number to date
    //@param ticks number
    //return date date
    private ticksToDate(ticks: number): Date{
        return new Date((ticks - JSTIME) / 10000);
    }

    //Convert date to ticks number
    //@param date date
    //return ticks number
    private dateToTicks(date: Date): number{
        return ((date.getTime() * 10000) + JSTIME);
    }
}
