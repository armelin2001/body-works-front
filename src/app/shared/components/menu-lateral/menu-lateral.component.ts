import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../local-storage/localstorage.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent {

  id: string = '';
  adm: boolean = false;
  nomeUsuario: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(" ")[0];
    this.adm = usuario.adm;
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

  navegarParaListagemEquipamentos(){
    this.router.navigate(['/visualiza-equipamentos']);
  }
}
