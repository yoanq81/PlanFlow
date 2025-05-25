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

export class Card {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public idList: string,
    public closed: boolean,
    public pinned: boolean,
    public dueComplete: boolean,
    public url: string,
    public dateCompleted: string | null = null,
    public dateClosed: string | null = null,
    public pos: number
  ) {}
}

export class ListOfCards {
  constructor(
    public id: string,
    public name: string,
    public closed: boolean,
    public pos: number,
    public cards: Card[] = []
  ) {}
}

export class ComplexBoard {
  constructor(
    public id: string,
    public name: string,
    public lists: ListOfCards[]
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

@Injectable({
  providedIn: 'root',
})
export class BoardFullAdapter implements Adapter<ComplexBoard> {
  adapt(item: any): ComplexBoard {
    const items: ListOfCards[] = item.lists.map((list: any) => {
      const cards: Card[] = [];
      item.cards.forEach((card: any) => {
        if (card.idList === list.id) {
          cards.push(
            new Card(
              card.id,
              card.name,
              card.desc,
              card.idList,
              card.closed,
              card.pinned,
              card.dueComplete,
              card.url,
              card.dateCompleted,
              card.dateClosed,
              card.pos
            )
          );
        }
      });
      return new ListOfCards(
        list.id,
        list.name,
        list.closed,
        list.pos,
        cards.sort((a, b) => a.pos - b.pos)
      );
    });
    return new ComplexBoard(
      item.id,
      item.name,
      items.sort((a, b) => a.pos - b.pos)
    );
  }
}
