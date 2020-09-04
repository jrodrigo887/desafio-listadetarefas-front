import { Todo } from './../../interface/Todo';
import { Item } from './../../interface/Item';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Item | Todo ) { }

  ngOnInit(): void {
  }

  public fechar() {
    this.dialogRef.close();
  }

  public enter() {
    this.dialogRef.afterClosed()
      .subscribe(
      resp => console.log(resp)
    );
  }

}
