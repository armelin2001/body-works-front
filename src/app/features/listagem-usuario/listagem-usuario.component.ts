import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/http-service/usuario-service/usuario.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss'],
})
export class ListagemUsuarioComponent implements OnInit {
  listaUsuarios: any[] = [];
  nomeUsuario: string = '';
  adm: boolean = false;
  id: string = '';
  mostraEditInstrutor: boolean = false;
  statusPagamento: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private localStorage: LocalstorageService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(' ')[0];
    this.adm = usuario.adm;
    if(!usuario.perfil){
      this.mostraEditInstrutor = true;
    }
    this.id = usuario.id;
    this.carregarListaUsuarios();
  }

  carregarListaUsuarios() {
    this.usuarioService.obterTodosUsuarios().subscribe(
      (res) => {
        this.listaUsuarios = res.dados;
      },
      (err) => {
        console.error('Erro ao carregar lista de usuários:', err);
      }
    );
  }

  atualizarStatusPagamento(usuarioId: string, novoStatus: string) {
    this.usuarioService.atualizarStatusPagamento(usuarioId, novoStatus).subscribe(
      (res) => {
        console.log('Status de pagamento atualizado com sucesso!', res);
      },
      (err) => {
        console.error('Erro ao atualizar status de pagamento:', err);
      }
    );
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
}
