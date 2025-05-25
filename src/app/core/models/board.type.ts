import { Injectable } from '@angular/core';
import { Adapter } from '../utils/adapter';

export class Board {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public closed: boolean,
    public pinned: boolean,
    public starred: boolean,
    public url: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class BoardAdapter implements Adapter<Board> {
  adapt(item: any): Board {
    return new Board(
      item.id,
      item.name,
      item.description,
      item.closed,
      item.pinned,
      item.starred,
      item.url
    );
  }
}
