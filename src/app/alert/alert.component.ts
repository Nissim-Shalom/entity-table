import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert',
  template: `
    <div class="message">{{message}}</div>
    <div mat-dialog-actions *ngIf="isConfirm">
      <button mat-button (click)="okClick()">Ok</button>
      <button mat-button (click)="cancelClick()">Cancel</button>
  </div>
  `,
  styles: [`
    .message{
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      padding-top: 12px;
      color: brown;
    }

    .mat-dialog-actions{
      padding: 25px 0;
    }
  `]
})

//alert or confirm component
export class AlertComponent implements OnInit {


  public message:string;              //message to show in the dialog
  public isConfirm: boolean = false;  //if ture the dialog is confirm dialog to remove entity
  onRemove = new EventEmitter();
  
  constructor(private dialogRef: MatDialogRef<AlertComponent>) {}

  ngOnInit() {
  }

  //fire when ok button clicked
  public okClick(){

    //call emit to parent component for remove entity 
    this.onRemove.emit();

    //close this confirm dialog
    this.dialogRef.close();
  }

  //fire when cancel button clicked
  public cancelClick(): void {
    //close this confirm dialog and do nothing
    this.dialogRef.close();
  }

}
