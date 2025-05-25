import { Component, inject, input } from '@angular/core';
import { BoardsService } from '../../core/services/boards.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from '../boards/components/add-board-dialog/add-board-dialog.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-board-lists',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
  ],
  templateUrl: './board-lists.component.html',
  styleUrl: './board-lists.component.scss',
})
export default class BoardListsComponent {
  readonly #boardsService = inject(BoardsService);
  readonly dialog = inject(MatDialog);
  readonly boardId = input.required<string>();

  boardListsRes = rxResource({
    request: () => ({ id: this.boardId() }),
    loader: ({ request }) =>
      this.#boardsService.getBoardList(request.id).pipe(
        map((result: any) => {
          return result;
        })
      ),
  });

  reloadBoardLists() {
    this.boardListsRes.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBoardDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log('New board data:', result);
        // this.#boardsService.addNewBoard(result).subscribe({
        //   next: () => {
        //     this.#boardsService.refreshBoards();
        //   },
        //   error: (err) => {
        //     console.error('Error adding new board:', err);
        //   },
        // });
      }
    });
  }
}
