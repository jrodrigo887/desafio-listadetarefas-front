import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { Todo } from '../interface/Todo';
import { Item } from '../interface/Item';

const API_URL = environment.API_HEROKU;

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  data: Todo;

  constructor(private http: HttpClient) {}

  //  métodos dos itens
  getTodos(): Observable<Todo[]> {

    return this.http.get<Todo[]>(`${API_URL}/tarefas`);

  }


  public addItem(list: Todo, item: Item):
    Observable<Item | Todo> {
    const { id } = list;

    if (id === null || undefined) {
      return this.addListTitulo(list)
        .pipe(
          mergeMap(listId => this.saveItem(listId.id, item))
        );

    } else {

      return this.saveItem(id, item);
    }
  }

  private saveItem(idTarefa: number, item: Item): Observable<Item> {
    item.concluido = false;
    return this.http
      .post<Item>(`${API_URL}/tarefas/${idTarefa}/items`, item)
        .pipe(
          catchError(this.errorHandler)
        );
  }


  public updateItem(idList: number, item: Item): Observable<Item> {
    console.log(item);
    const idItem = item.id;

    return this.http
      .put<Item>(`${API_URL}/tarefas/${idList}/items/${idItem}`, {titulo: item.titulo, concluido: item.concluido})
        .pipe(
          debounceTime(300),
          catchError(this.errorHandler)
        );
  }


  public removeItem(idTarefa: number, item: Item) {
    const idItem = item.id;

    return this.http
        .delete(`${API_URL}/tarefas/${idTarefa}/items/${idItem}`)
          .pipe(
            catchError(this.errorHandler)
          );
  }







  // métodos da lista geral
  // getListTitulo(): Todo {
  //   return this.data;
  // }

  public addList(titulo: string): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/tarefas`, {titulo });
  }

  private addListTitulo(todoList: Todo): Observable<Todo> {
    const { id } = todoList;

    return this.http.post<Todo>(`${API_URL}/tarefas/${id}`, {titulo: todoList.titulo })
      .pipe(
        map((data) => data),
        catchError(this.errorHandler)
      );
  }

  public updateListTitulo(todoList: Todo) {
    const { id } = todoList;

    return this.http.put<Todo>(`${API_URL}/tarefas/${id}`, {titulo: todoList.titulo })
      .pipe(
        map((data) => data),
        catchError(this.errorHandler)
      );
  }

  public removeList(idList: number) {
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error.message);
    return EMPTY;
  }



  // addTodo(todoTitle: string): void {
  //   console.log(todoTitle);
  // }

}
