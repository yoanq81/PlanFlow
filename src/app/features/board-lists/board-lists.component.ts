import { Component, inject, input } from '@angular/core';
import { BoardsService } from '../../core/services/boards.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-board-lists',
  imports: [],
  templateUrl: './board-lists.component.html',
  styleUrl: './board-lists.component.scss',
})
export default class BoardListsComponent {
  readonly #boardsService = inject(BoardsService);
  readonly boardId = input.required<string>();

  boardListsRes = rxResource({
    request: () => ({ id: this.boardId() }),
    loader: ({ request }) =>
      this.#boardsService.getBoardList(request.id).pipe(
        map((result: any) => {
          console.log('Board lists:', result);
          return result;
        })
      ),
  });
}
