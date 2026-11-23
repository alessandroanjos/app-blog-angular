import { Component, inject } from '@angular/core';

import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Auth from '../../services/auth';

@Component({
  imports: [MatToolbar, RouterOutlet, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  private router = inject(Router);
  private auth = inject(Auth);


  logout(){
    this.auth.logout();
    this.router.navigate(['/blog'])
  }

}
