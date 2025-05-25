import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BoardsService } from '../../core/services/boards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  readonly #router = inject(Router);
  readonly #boardsService = inject(BoardsService);
  boards = this.#boardsService.boardsRes;
  dataSourceBoards = computed(() =>
    this.boards.hasValue() ? this.boards.value()!.slice(0, 7) : []
  );
  hasBoards = computed(
    () => this.boards.hasValue() && this.boards.value()!.length > 0
  );

  goToRoute(route: string) {
    this.#router.navigate([route]);
  }
}
