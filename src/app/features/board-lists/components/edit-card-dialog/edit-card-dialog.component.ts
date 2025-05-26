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
  selector: 'app-edit-card-dialog',
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
  templateUrl: './edit-card-dialog.component.html',
})
export class EditCardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditCardDialogComponent>);
  readonly data = inject<{ title: string; description: string; name: string }>(
    MAT_DIALOG_DATA
  );
  readonly name = model(this.data.name || ''); // Initialize with existing name or empty string

  onNoClick(): void {
    this.dialogRef.close();
  }
}
