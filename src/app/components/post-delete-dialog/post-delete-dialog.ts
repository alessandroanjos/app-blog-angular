import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatDialogModule, MatButtonModule],
  selector: 'app-post-delete-dialog',
  styleUrl: './post-delete-dialog.css',
  templateUrl: './post-delete-dialog.html',
})
export class PostDeleteDialog {}
