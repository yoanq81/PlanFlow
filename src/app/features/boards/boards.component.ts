import { Component, inject, model, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { BoardsService } from '../../core/services/boards.service';
import { ViewSelected } from '../../core/models/view-selected.type';
import { BoardTableViewComponent } from './components/table-view/table-view.component';
import { BoardCardViewComponent } from './components/card-view/card-view.component';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from './components/add-board-dialog/add-board-dialog.component';

@Component({
  selector: 'app-boards',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    BoardTableViewComponent,
    BoardCardViewComponent,
  ],
  templateUrl: './boards.component.html',
})
export default class BoardsComponent {
  readonly #boardsService = inject(BoardsService);
  readonly dialog = inject(MatDialog);
  viewSelected = signal<ViewSelected>(this.#boardsService.viewSelected);

  changeViewSelected(value: ViewSelected) {
    this.viewSelected.set(value);
    this.#boardsService.setViewSelected(value);
  }

  reloadBoards() {
    this.#boardsService.refreshBoards();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      data: {
        title: 'Aicionar tablero',
        description: 'Introduzca el nombre del tablero que desea crear',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.#boardsService.addNewBoard(result).subscribe({
          next: () => {
            this.#boardsService.refreshBoards();
          },
          error: (err) => {
            console.error('Error adding new board:', err);
          },
        });
      }
    });
  }
}
