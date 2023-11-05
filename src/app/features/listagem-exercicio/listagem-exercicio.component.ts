import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { IExercicioDTO } from 'src/app/shared/models/exercicio.dto';


@Component({
  selector: 'app-listagem-exercicio',
  templateUrl: './listagem-exercicio.component.html',
  styleUrls: ['./listagem-exercicio.component.scss']
})
export class ListagemExercicioComponent {
  listaExercicios: IExercicioDTO[] = [];
  id: string = '';
  adm: boolean = false;
  nomeUsuario: string = '';
  mostraEditInstrutor: boolean = false;
  statusPagamento: string = '';
  @ViewChild('sidebarRef', { static: false }) sidebarRef!: ElementRef;

  constructor(
    private exercicioSerivice: ExercicioService,
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
    this.carregarListaExercicios();
  }

  carregarListaExercicios() {
    this.exercicioSerivice.obterTodosExercicios().subscribe(
      (res) => {
        res.dados.forEach((exercicio: any) => {
          const exercicioDto: IExercicioDTO = {
            id: exercicio.id,
            nome: exercicio.nome,
            tipoExercicio: exercicio.tipoExercicio,
            equipamentoNecessario: exercicio.equipamentoNecessario,
            nivelDificuldade: exercicio.nivelDificuldade,
            videoDemonstrativo: exercicio.videoDemonstrativo,
            musculosTrabalhados: exercicio.musculosTrabalhados
          };
          this.listaExercicios.push(exercicioDto);
        });
      },
      (err) => {}
    );
  }

  removeItemListagem(event: any) {
    if (event) {
      this.listaExercicios = [];
      this.carregarListaExercicios();
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
