import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss']
})
export class HomeUsuarioComponent {
  showAccountMenu = false;
  constructor(private router: Router) {}

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro']);
  }
  logout() {
    this.router.navigate(['/login']);
  }
}

