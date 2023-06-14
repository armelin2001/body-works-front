import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss'],
})
export class HomeUsuarioComponent implements OnInit {
  showAccountMenu = false;
  id: string = '';
  adm: boolean = false;
  mostraEditInstrutor: boolean = false;
  nomeUsuario: string = '';
  cargoUsuario: string = '';

  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(' ')[0];
    this.adm = usuario.adm;
    switch (usuario.nivelADM) {
      case '1':
        this.cargoUsuario = 'Moderador';
        break;
      case '2':
        this.cargoUsuario = 'Gerente';
        break;
      case '3':
        this.cargoUsuario = 'Dono';
        break;
      default:
        this.cargoUsuario = 'Aluno';
        break;
    }
    if(!usuario.perfil){
      this.mostraEditInstrutor = true;
    }
    this.id = usuario.id;
  }

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }

  logout() {
    this.localStorage.remover('usuario');
    this.router.navigate(['/login']);
  }

  navegaParaEditAdm() {
    this.router.navigate(['/edit-cadastro-adm/' + this.id + "/" + true]);
  }

  navegarParaCadastroInstrutor(){
    this.router.navigate(['/edit-cadastro-adm/' + this.id + "/" + false]);
  }

  navegarParaListagemInstrutores(){
    this.router.navigate(['/visualiza-instrutores']);
  }

  navegarParaCadastroEquipamento(){
    this.router.navigate(['/equipamento-cadastro']);
  }
  
  navegarParaListagemEquipamentos() {
    this.router.navigate(['/visualiza-equipamentos']);
  }
}
