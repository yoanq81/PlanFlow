import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pending-product-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-board-dialog.component.html',
})
export class AddBoardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddBoardDialogComponent>);
  readonly name = model('');
  readonly data = inject<{ title: string; description: string }>(
    MAT_DIALOG_DATA
  );

  onNoClick(): void {
    this.dialogRef.close();
  }
}
