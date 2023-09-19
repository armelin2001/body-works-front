import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { IEquipamentoDTO } from 'src/app/shared/models/equipamento.dto';

@Component({
  selector: 'app-listagem-equipamento',
  templateUrl: './listagem-equipamento.component.html',
  styleUrls: ['./listagem-equipamento.component.scss'],
})
export class ListagemEquipamentoComponent implements OnInit {
  listaEquipamentos: IEquipamentoDTO[] = [];
  id: string = '';
  adm: boolean = false;
  nomeUsuario: string = '';
  mostraEditInstrutor: boolean = false;
  statusPagamento: string = '';
  @ViewChild('sidebarRef', { static: false }) sidebarRef!: ElementRef;

  constructor(
    private equipamentoSerivice: EquipamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(' ')[0];
    this.adm = usuario.adm;
    if(!usuario.perfil){
      this.mostraEditInstrutor = true;
    }
    this.id = usuario.id;
    this.carregarListaEquipamentos();
  }

  carregarListaEquipamentos() {
    this.equipamentoSerivice.obterTodosEquipamentos().subscribe(
      (res) => {
        res.dados.forEach((equipamento: any) => {
          const equipamentoDto: IEquipamentoDTO = {
            id: equipamento.id,
            nome: equipamento.nome,
            tipo: equipamento.tipo,
          };
          this.listaEquipamentos.push(equipamentoDto);
        });
      },
      (err) => {}
    );
  }

  removeItemListagem(event: any) {
    if (event) {
      this.listaEquipamentos = [];
      this.carregarListaEquipamentos();
    }
  }

  navegaParaEditAdm() {
    this.router.navigate(['/edit-cadastro-adm/' + this.id + '/' + true]);
  }

  navegarParaCadastroInstrutor() {
    this.router.navigate(['/edit-cadastro-adm/' + this.id + '/' + false]);
  }

  navegarParaListagemInstrutores() {
    this.router.navigate(['/visualiza-instrutores']);
  }

  navegarParaCadastroEquipamento() {
    this.router.navigate(['/equipamento-cadastro']);
  }

  navegarParaListagemEquipamentos() {
    this.router.navigate(['/visualiza-equipamentos']);
  }
  
  navegarParaListagemUsuario() {
    this.router.navigate(['/visualiza-usuario']);
  }

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }

  logout() {
    this.localStorage.remover('usuario');
    this.router.navigate(['/login']);
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
