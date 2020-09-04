import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Item {
  id?: number;
  titulo: string;
  concluido?: boolean;
  createdAt?: Timestamp<any>;
  updatedAt?: Timestamp<any>;
}
