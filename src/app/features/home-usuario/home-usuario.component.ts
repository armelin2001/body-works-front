import { Router } from '@angular/router';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  statusPagamento: string = '';
  @ViewChild('sidebarRef', { static: false }) sidebarRef!: ElementRef;

  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(' ')[0];
    this.adm = usuario.adm;
    if(!usuario.perfil){
      this.mostraEditInstrutor = true;
    }
    this.id = usuario.id;

    switch (usuario.statusPagamento) {
      case 'ativo':
        this.statusPagamento = 'Conta ativa';
        break;
      case 'atrasado':
        this.statusPagamento = 'Mensalidade atrasada';
        break;
      case 'cancelado':
        this.statusPagamento = 'Conta suspensa';
        break;
    }
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

  navegarParaListagemUsuario() {
    this.router.navigate(['/visualiza-usuario']);
  }

  navegarParaTreinos() {
    this.router.navigate(['/treinos']);
  }

  toggleSidebar() {
    const sidebarWidth = this.sidebarRef.nativeElement.style.width;
    if (sidebarWidth === "0px" || !sidebarWidth) {
        this.sidebarRef.nativeElement.style.width = "250px";
    } else {
        this.sidebarRef.nativeElement.style.width = "0px";
    }
  }
}
