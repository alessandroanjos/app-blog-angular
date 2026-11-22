import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { Post } from '../../models/post';
import { MatDialog } from '@angular/material/dialog';
import { DashboardPostFormDialog } from '../dashboard-post-form-dialog/dashboard-post-form-dialog';


@Component({
  imports: [MatTableModule, MatAnchor, MatButtonModule, MatIconModule],
  selector: 'app-dashboard-post-tab',
  styleUrl: './dashboard-post-tab.css',
  templateUrl: './dashboard-post-tab.html',
})
export class DashboardPostTab {


  constructor(private dialog: MatDialog) {
  }


  posts: Post[] = [];

  //displayedHearders

  displayedColumns = ["id", "author", "title", "date", "edit", "delete"]

  openPostFormDialog(){
    console.log("Abrindo Dialog");

    const dialogRef = this.dialog.open(DashboardPostFormDialog)

    //notifica quando o form é fechado
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Result", result)
    })

  }
}
