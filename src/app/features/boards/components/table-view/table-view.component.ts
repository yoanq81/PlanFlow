import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BoardsService } from '../../../../core/services/boards.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pp-table-view',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
  ],
  templateUrl: './table-view.component.html',
})
export class BoardTableViewComponent {
  readonly #boardsService = inject(BoardsService);
  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);

  #smallSignal = toSignal(
    this.#breakpointObserver.observe(Breakpoints.Small).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );
  #xsmallSignal = toSignal(
    this.#breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );
  #fullDisplayedColumns: string[] = [
    'name',
    'description',
    'url',
    'closed',
    'pinned',
    'starred',
    'action',
  ];
  #smallDisplayedColumns: string[] = [
    'name',
    'description',
    'starred',
    'action',
  ];
  #xsmallDisplayedColumns: string[] = ['name', 'starred', 'action'];
  protected readonly displayedColumns = computed(() => {
    return this.#smallSignal()
      ? this.#smallDisplayedColumns
      : this.#xsmallSignal()
      ? this.#xsmallDisplayedColumns
      : this.#fullDisplayedColumns;
  });

  boards = this.#boardsService.boardsRes;
  dataSource = computed(() =>
    this.boards.hasValue() ? this.boards.value()! : []
  );
}
