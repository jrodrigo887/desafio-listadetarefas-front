import { ModalComponent } from './../../componentes/modal/modal.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from '../../interface/Item';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],

})
export class TodoItemComponent implements OnInit {
  // editar = false;
  private cacheItem: Item;

  @Input() item: Item;

  @Output() remover: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() concluido: EventEmitter<any> = new EventEmitter<any>();
  @Output() editado: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(
    private dialogService: ModalService,
  ) { }

  ngOnInit(): void {
    this.cacheItem = this.item;



  }

  public removeItem(): void {
    this.remover.emit(this.item);
  }

  public itemConcluido(concluido: boolean): void {
    this.item.concluido = concluido;
    setTimeout(() => {
      this.concluido.emit({
        concluido,
        ...this.item
      });
    }, 500);
  }

  public editarItem(): void {

    this.dialogService.editar(this.item)
      .subscribe(titulo => {
        console.log(titulo);
        if (titulo !== undefined || null) {
          this.item.titulo = titulo;
          this.editado.emit({ ...this.item });
        }
        return;
      });
  }


  public cancelEdit() {
    this.item.titulo = this.cacheItem.titulo;
    // this.editar = false;
  }

}
