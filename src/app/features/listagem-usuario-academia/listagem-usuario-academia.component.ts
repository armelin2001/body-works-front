import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioAcademiaService } from 'src/app/shared/http-service/usuario-academia/usuario-academia.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { UsuarioAcademiaAdmResumidoDto } from 'src/app/shared/models/usuario-academia.dto';

@Component({
  selector: 'app-listagem-usuario-academia',
  templateUrl: './listagem-usuario-academia.component.html',
  styleUrls: ['./listagem-usuario-academia.component.scss'],
})
export class ListagemUsuarioAcademiaComponent implements OnInit {
  listaInstrutores: UsuarioAcademiaAdmResumidoDto[] = [];
  id: string = '';
  adm: boolean = false;
  nomeUsuario: string = '';

  constructor(
    private usuarioAcademiaService: UsuarioAcademiaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    const usuario = this.localStorage.obter('usuario') as any;
    this.nomeUsuario = String(usuario.nome).split(' ')[0];
    this.adm = usuario.adm;
    this.id = usuario.id;
    this.carregarListaInstrutores();
  }

  carregarListaInstrutores() {
    this.usuarioAcademiaService
      .obterTodosUsuariosAcademia()
      .subscribe((res) => {
        res.dados.forEach((usuario: any) => {
          if (!usuario.adm) {
            const usuarioAcademiaResumido: UsuarioAcademiaAdmResumidoDto = {
              id: usuario.id,
              nome: usuario.nome,
              cpf: usuario.cpf,
              email: usuario.email,
              adm: usuario.adm,
            };
            this.listaInstrutores.push(usuarioAcademiaResumido);
          }
        });
      });
  }

  removeItemListagem(event: any) {
    if (event) {
      this.listaInstrutores = [];
      this.carregarListaInstrutores();
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

  navigateToEditCadastro(): void {
    this.router.navigate(['/edit-cadastro/' + this.id]);
  }

  logout() {
    this.localStorage.remover('usuario');
    this.router.navigate(['/login']);
  }
}
