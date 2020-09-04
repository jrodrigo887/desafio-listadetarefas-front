import { Item } from './Item';
export interface Todo {
  id?: number;
  titulo?: string;
  editar?: boolean;
  items: Item[];
}
