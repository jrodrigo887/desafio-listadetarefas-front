import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { ListaService } from '../services/lista.service';
import { Item } from '../interface/Item';
import { Todo } from '../interface/Todo';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit,
  OnDestroy {

  getListSub$ = new Subject();
  editListSub$ = new Subject();

  deletItemSub$ = new Subject();
  addItemSubj$ = new Subject();
  updateItemSubj$ = new Subject();


  nomeDaLista: string;
  item: Item;
  data: Todo = null;
  editar = true;

  constructor(
    private listaService: ListaService,
    private changeRef: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    changeRef.detach();
  }


  ngOnInit(): void {

    this.nomeDaLista = 'Minha Lista';

    this.listaService.getTodos()
      .pipe(
        takeUntil(this.getListSub$),
        finalize(() => this.changeRef.detectChanges())
      )
      .subscribe((data) => {
        const result = data
          .find((todo, index, arr) => todo.items.length > 0);
        this.nomeDaLista = result.titulo;
        this.data = result;
      });
  }


  public addItem(titulo): void {

    this.listaService.addItem(this.data, { titulo })
      .subscribe(
        resp => { console.log(resp); },
        () => { },
        () => this.ngOnInit()
        );

  }


  public updateItem(item: Item) {

    this.listaService.updateItem(this.data.id, item)
      .pipe()
      .subscribe(
        resp => {
          console.log('Atualizado');
          this.ngOnInit();
        },
        (e) => { console.error('Error: ' + e.message); }
      );

  }


  public removeItem(event) {

    this.listaService.removeItem(this.data.id, event)
      .pipe(
        takeUntil(this.deletItemSub$)
      )
      .subscribe(del => {
        console.log('Deletado com Sucesso!' + del);
        this.ngOnInit();
      });

  }


  public editarTituloDaLista() {

    this.modalService.editar(this.data)
      .subscribe(titulo => {
        console.log(titulo);
        if (titulo !== undefined || null) {
          this.data.titulo = titulo;
          this.listaService.updateListTitulo(this.data)
            .pipe(
              takeUntil(this.editListSub$)
            )
            .subscribe(() => this.ngOnInit());
        }
        return;
      });

  }

  ngOnDestroy(): void {
    this.getListSub$.next();
    this.getListSub$.complete();

    this.deletItemSub$.next();
    this.deletItemSub$.complete();

    this.editListSub$.next();
    this.editListSub$.complete();

    this.addItemSubj$.next();
    this.addItemSubj$.complete();

    this.updateItemSubj$.next();
    this.updateItemSubj$.complete();
  }

}
