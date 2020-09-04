import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Item } from './../interface/Item';
import { Injectable } from '@angular/core';
import { ModalComponent } from '../componentes/modal/modal.component';
import { Todo } from '../interface/Todo';
import { title } from 'process';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  title: string;

  constructor(
    private dialog: MatDialog,
  ) { }


  public editar(item: Item | Todo) {

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { ...item }
    });
    return dialogRef.afterClosed();
  }

}
