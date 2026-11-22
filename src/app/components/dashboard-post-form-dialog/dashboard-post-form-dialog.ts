import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { delay } from 'rxjs';

@Component({
  imports: [MatDialogModule, MatInputModule, MatFormField, MatButtonModule, FormsModule],
  selector: 'app-dashboard-post-form-dialog',
  styleUrl: './dashboard-post-form-dialog.css',
  templateUrl: './dashboard-post-form-dialog.html',
})
export class DashboardPostFormDialog {


  author: string = "Francisco";
  title: string = "";
  date: string = "";
  content: string = "";

  ngOnInit(){
    //pesquisar na API
    this.author = 'Andressa'
  }



  onSubmit(postForm: NgForm){

    const name = postForm.form.value.name;
    const title = postForm.form.value.title;
    const date = postForm.form.value.date;
    const content = postForm.form.value.content;

    console.log(`[Name]: ${name}, Title:${title} `)

    console.log("form cadastro", postForm)
  }
}
