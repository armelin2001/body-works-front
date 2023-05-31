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
  userName: string = ''; // nova propriedade para o nome do usuário

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService // injetar o UsuarioService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    // usar o método obterUsuario(id) do UsuarioService
    this.usuarioService.obterUsuario(this.id).subscribe((usuario) => {
      this.userName = usuario.nome; // substitua 'nome' pela propriedade correta do seu objeto usuário
    });
  }

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
