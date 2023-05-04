import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss'],
})
export class HomeUsuarioComponent implements OnInit {
  showAccountMenu = false;
  id: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
