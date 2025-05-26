import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BoardsService } from '../../../../core/services/boards.service';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pp-card-view',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
  ],
  templateUrl: './card-view.component.html',
})
export class BoardCardViewComponent {
  readonly #boardsService = inject(BoardsService);
  boards = this.#boardsService.boardsRes;
  dataSource = computed(() =>
    this.boards.hasValue() ? this.boards.value()! : []
  );
}
