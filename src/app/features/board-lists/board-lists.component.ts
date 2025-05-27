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
import { EditCardDialogComponent } from './components/edit-card-dialog/edit-card-dialog.component';
import { ComplexBoard } from '../../core/models/board.type';
import { OpenAIService } from '../../core/services/openai.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

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
  readonly #openAIService = inject(OpenAIService);
  readonly dialog = inject(MatDialog);
  readonly boardId = input.required<string>();

  boardListsRes = rxResource({
    request: () => ({ id: this.boardId() }),
    loader: ({ request }) =>
      this.#boardsService.getBoardList(request.id).pipe(
        map((result: ComplexBoard) => {
          return result;
        })
      ),
  });

  reloadBoardLists() {
    this.boardListsRes.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      data: {
        title: 'Adicionar lista',
        description: 'Introduzca el nombre de la lista que desea crear',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.#boardsService.addNewList(result, this.boardId()).subscribe({
          next: () => {
            this.reloadBoardLists();
          },
          error: (err) => {
            console.error('Error adding new list:', err);
          },
        });
      }
    });
  }

  openDialogForCard(idList: string): void {
    const dialogRef = this.dialog.open(AddBoardDialogComponent, {
      data: {
        title: 'Adicionar tarjeta',
        description: 'Introduzca el nombre de la tarjeta que desea crear',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.#boardsService.addNewCard(result, idList).subscribe({
          next: () => {
            this.reloadBoardLists();
          },
          error: (err) => {
            console.error('Error adding new card:', err);
          },
        });
      }
    });
  }

  openDialogForEditCard(idCard: string, name: string): void {
    const dialogRef = this.dialog.open(EditCardDialogComponent, {
      data: {
        title: 'Editar tarjeta',
        description: 'Cambie el nombre de la tarjeta',
        name: name || '', // Initialize with existing name or empty string
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.#boardsService.editCard(result, idCard).subscribe({
          next: () => {
            this.reloadBoardLists();
          },
          error: (err) => {
            console.error('Error editing card:', err);
          },
        });
      }
    });
  }

  questionPriorityTasks() {
    let question = 'Tomando en cuenta la siguiente información\n';
    this.boardListsRes.value()?.lists.forEach((item) => {
      if (item.cards.length > 0) {
        let itemStr = `${item.name} con las tareas\n`;
        item.cards.forEach(
          (card) =>
            (itemStr = itemStr + `${card.name} - ${card.description}` + '\n')
        );
        question = question + itemStr + '\n';
      } else {
        let itemStr = `${item.name} sin tareas\n`;
        question = question + itemStr + '\n';
      }
    });
    question = question + 'Identificar las tareas prioritarias';
    this.#openAIService.generateText(question).subscribe((data) => {
      const response = data.choices[0].message.content.trim();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Sugerencias',
          description: response,
        },
      });

      dialogRef.afterClosed().subscribe();
    });
  }

  questionFlowChange() {
    let question = 'Tomando en cuenta la siguiente información\n';
    this.boardListsRes.value()?.lists.forEach((item) => {
      if (item.cards.length > 0) {
        let itemStr = `${item.name} con las tareas\n`;
        item.cards.forEach(
          (card) =>
            (itemStr = itemStr + `${card.name} - ${card.description}` + '\n')
        );
        question = question + itemStr + '\n';
      } else {
        let itemStr = `${item.name} sin tareas\n`;
        question = question + itemStr + '\n';
      }
    });
    question =
      question +
      'Se desea identificar posibles cambios en el flujo de trabajo (por ejemplo: “Demasiadas tarjetas en Doing, considera limitar el WIP”).';
    this.#openAIService.generateText(question).subscribe((data) => {
      const response = data.choices[0].message.content.trim();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Sugerencias',
          description: response,
        },
      });

      dialogRef.afterClosed().subscribe();
    });
  }
}
