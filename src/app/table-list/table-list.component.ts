import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Entity } from "../models/Entity.model";
import { IEntityTable, IEntityList, IEntity } from "../models/model.interface";
import { EntityFormComponent } from "../entity-form/entity-form.component";
import { AlertComponent } from "../alert/alert.component";

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    public entities: IEntityTable[] = [];  // list of entities that show in the page tbale
    public sortByField: string = "Id";     // indicat for filed sort in the page table
    public isAsc: boolean = false;         // indicat for asc or desc sort in the page table

    constructor(private entityModel: Entity, private dialog: MatDialog) { }

    ngOnInit() {

        //http call for get all entity for the tabl
        this.entityModel.getEntities().subscribe((p: IEntityList) => {
            this.entities = p.List;
        });
    }

    //call when header table of date or name is clicked
    public setSortByField(field: string): void {

        //if same header clicked again
        if (this.sortByField == field) {
            //when second time clicked
            if (!this.isAsc) {
                this.isAsc = true;
            }
            // when third time clicked back to default
            else {
                this.isAsc = false;
                this.sortByField = "Id";
            }
        }
        //when first time clicked
        else {
            this.isAsc = false;
            this.sortByField = field;
        }
    }

    //call when edit icon in the entity row is clicked 
    public editEntity(id?: string) {

        // if id is not null then call http requst for to get
        // the current entity details and open popup of entity form
        // for this entity
        if(id !== null) {

            //http call for get entity details by id
            this.entityModel.getEntity(id).subscribe((p: IEntity) => {
            
                // call to openPopup function and pass entity details parmeter
                // after finished the popup object return from the function
                let updateDialog = this.openPopup(p);
                
                //call from EntityFormComponent emitter onUpdate
                //after update bd success.
                //update entity row details in the page table
                updateDialog.componentInstance.onUpdate.subscribe((data: IEntityTable) => {
                    let entity = this.entities.find(i => i.Id === data.Id);
                    entity.Date = data.Date;
                    entity.Name = data.Name;
                    
                });
            })
        }
        // if id is null then open the popup of entity form
        // for create new entity
        else {

            // call to openPopup function and pass empty object for create new one
            // after finished the popup object return from the function
            let createDialog = this.openPopup({});
            
            //call from EntityFormComponent emitter onCreate
            //after insert new entity to bd and success.
            //insert new entity row details in the page table
            createDialog.componentInstance.onCreate.subscribe((data: IEntityTable) => {
                let entity: IEntityTable = {
                    Id : data.Id,
                    Date : data.Date,
                    Name : data.Name
                }
                this.entities.push(entity);
                
            });
        }
    }

    //call when remove icon in the entity row is clicked
    public removeEntity(id: string, index: number): void {

        //call to confirmDialog for confirm request for remove entity
        let dialog = this.confirmDialog("Are you sure you want to remove this enitity from database?");
        
        //call from AlertComponent emitter onRemove
        //after confirm to remove current entity.
        dialog.componentInstance.onRemove.subscribe(p =>{

                //call http request for remove current entity from db
                this.entityModel.removeEntity(id).subscribe(p => {

                    //if remove entity form db success
                    //then remove current entity row from the page table
                    this.entities.splice(index, 1);
                }, () => {

                    let message = 'error occourd while remove entity from database';

                    // create dialog for error message
                    let alert = this.dialog.open(AlertComponent, {
                        height : '100px',
                        width  : '450px'
                    });
                    
                    // set the error message to dialog
                    alert.componentInstance.message = message;

                });
        });
    }

    // Open popup for create or update entity
    public openPopup(p): any{

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '570px';
        dialogConfig.width = '600px';

        // if is empty object data then the form open for create a new entity
        // else the form open for update exsit entity
        dialogConfig.data = p;

        //Open the popup and return the object for continue the process  
        return this.dialog.open(EntityFormComponent, dialogConfig);
    }

    //Open confirm dialog for the user to ask 
    //if he is sure to remove current entity row
    public confirmDialog(message: string){

        let alert = this.dialog.open(AlertComponent, {
            height : '150px',
            width  : '550px',
            disableClose: true
        });
         
        alert.componentInstance.message = message;
        alert.componentInstance.isConfirm = true;
        
        //Open the dialog and return the object 
        //for continue the process or to close it 
        return alert;
       
    }
}
