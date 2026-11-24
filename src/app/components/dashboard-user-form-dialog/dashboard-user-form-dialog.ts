import { Component, Inject } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

import { v4 as uuidv4 } from 'uuid';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  selector: 'app-dashboard-user-form-dialog',
  styleUrl: './dashboard-user-form-dialog.css',
  templateUrl: './dashboard-user-form-dialog.html',
})
export class DashboardUserFormDialog {
  formTitle: string = 'Cadastrar usuário';
  submitButtonLabel: string = 'Cadastrar';
  saveError = '';

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<DashboardUserFormDialog>,
  ) {}

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(6)),
    isActive: new FormControl(true, Validators.required),
  });

  async ngOnInit() {
    if (this.data) {
      this.formTitle = 'Editar Usuário';
      this.submitButtonLabel = 'Editar';
      this.userForm.controls.password.clearValidators();
      this.userForm.controls.password.addValidators(Validators.minLength(6));

      this.userService.findUserById(this.data.id).subscribe((user) => {
        console.log(user);
        this.userForm.setValue({
          name: user.name,
          email: user.email,
          password: '',
          isActive: user.isActive,
        });
      });
    } else {
      this.userForm.controls.password.addValidators(Validators.required);
    }
    this.userForm.controls.password.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.saveError = '';
    const name = this.userForm.value.name!!;
    const email = this.userForm.value.email!!;
    const password = this.userForm.value.password!!;
    const isActive = this.userForm.value.isActive!!;

    if (this.data) {
      const editUser: Pick<User, 'id' | 'name' | 'email' | 'isActive'> &
        Partial<Pick<User, 'password'>> = {
        id: this.data.id,
        name,
        email,
        isActive,
        ...(password ? { password } : {}),
      };
      this.userService.updateUser(editUser).subscribe({
        next: () => this.dialogRef.close(),
        error: () => {
          this.saveError = 'Não foi possível salvar as alterações. Verifique os dados e tente novamente.';
        },
      });
    } else {
      const newUser = new User(uuidv4(), name, email, isActive, password);
      this.userService.createUser(newUser).subscribe({
        next: () => this.dialogRef.close(),
        error: () => {
          this.saveError = 'Não foi possível cadastrar o usuário. Verifique os dados e tente novamente.';
        },
      });
    }
  }
}
