import { inject, Injectable, signal } from '@angular/core';
import { ViewSelected } from '../models/view-selected.type';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  Board,
  BoardAdapter,
  BoardFullAdapter,
  ComplexBoard,
} from '../models/board.type';
import { LocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  readonly #key = 'plan-flow-boards';
  readonly #url = 'members/me/boards';
  readonly #boardUrl = 'boards';
  readonly #cardUrl = 'cards';
  readonly #listUrl = 'lists';
  readonly #storageService = inject(LocalStorageService);
  readonly #httpClient = inject(HttpClient);
  readonly #adapter = inject(BoardAdapter);
  readonly #fullAdapter = inject(BoardFullAdapter);

  #viewSelected = signal<ViewSelected>(
    this.#storageService.get(this.#key)?.view ?? 'table'
  );

  boardsRes = rxResource({
    loader: () =>
      this.#httpClient.get(`${this.#url}`).pipe(
        // Adapt each item in the raw data array'
        map((result: any) => {
          return result;
        }),
        map((data: any[]): Board[] =>
          data.map((item) => this.#adapter.adapt(item))
        )
      ),
  });

  get viewSelected() {
    return this.#viewSelected();
  }

  setViewSelected(value: ViewSelected) {
    if (value !== this.#viewSelected()) {
      const valueInStorage = this.#storageService.get(this.#key) ?? {
        elements: 10,
        view: 'table',
      };
      this.#viewSelected.set(value);
      this.#storageService.set(this.#key, {
        elements: valueInStorage.elements,
        view: value,
      });
    }
  }

  refreshBoards() {
    this.boardsRes.reload();
  }

  addNewBoard(board: string) {
    return this.#httpClient.post(`${this.#boardUrl}/?name=${board}`, {});
  }

  getBoardList(boardId: string) {
    return this.#httpClient
      .get(
        `${
          this.#boardUrl
        }/${boardId}/?fields=name&lists=all&list_fields=all&cards=all&card_fields=all&card_attachments=true`
      )
      .pipe(map((data: any): ComplexBoard => this.#fullAdapter.adapt(data)));
  }

  addNewCard(name: string, idList: string) {
    return this.#httpClient.post(
      `${this.#cardUrl}/?name=${name}&idList=${idList}`,
      {}
    );
  }

  editCard(name: string, idCard: string) {
    return this.#httpClient.post(`${this.#cardUrl}/${idCard}?name=${name}`, {});
  }

  addNewList(name: string, idBoard: string) {
    return this.#httpClient.post(
      `${this.#listUrl}/?name=${name}&idBoard=${idBoard}`,
      {}
    );
  }
}
