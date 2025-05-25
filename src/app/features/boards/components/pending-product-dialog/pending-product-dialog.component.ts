import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Board } from '../../../../core/models/board.type';

@Component({
  selector: 'app-pending-product-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './pending-product-dialog.component.html',
})
export class BoardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<BoardDialogComponent>);
  readonly data = inject<Board>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
