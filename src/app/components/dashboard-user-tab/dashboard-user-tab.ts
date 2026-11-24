import { Component, signal } from '@angular/core';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user-service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DashboardUserFormDialog } from '../dashboard-user-form-dialog/dashboard-user-form-dialog';
import { DeleteDialogComponent } from '../delete-dialog-component/delete-dialog-component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatIconModule, MatTableModule, MatButtonModule],
  selector: 'app-dashboard-user-tab',
  styleUrl: './dashboard-user-tab.css',
  templateUrl: './dashboard-user-tab.html',
})
export class DashboardUserTab {
  displayedColumns = ['id', 'name', 'email', 'active', 'edit', 'delete'];
  users = signal<User[]>([]);

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  openNewUserFormDialog() {
    const dialogRef = this.dialog.open(DashboardUserFormDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  openEditUserDialog(id: string) {
    const dialogRef = this.dialog.open(DashboardUserFormDialog, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUserDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        title: 'Excluir Usuário',
        text: 'Você tem certeza que deseja excluir o usuário selecionado?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.userService.deleteUserById(id).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  loadUsers() {
    this.userService.findAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
