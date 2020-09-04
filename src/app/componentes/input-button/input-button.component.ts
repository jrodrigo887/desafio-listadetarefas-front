import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-button',
  template: `
    <input class="todo-input" type="text"
      placeholder="Add nova Tarefa"  #input
        (keyup.enter)="enviarTitulo($event.target.value)" >
    <button class="btn"
      (click)="enviarTitulo(input.value)">Salvar</button>`,

  styleUrls: ['./input-button.component.css']
})
export class InputButtonComponent implements OnInit {

  titulo = 'Add uma nova tarefa';

  @Output() enviar: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public enviarTitulo(novoTitulo: string) {
    this.enviar.emit(novoTitulo);
    this.titulo = '';
  }



}
