import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  readonly data = inject<{ title: string; description: string }>(
    MAT_DIALOG_DATA
  );

  onNoClick(): void {
    this.dialogRef.close();
  }
}
