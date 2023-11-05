import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HistoricoTreinoService } from 'src/app/shared/http-service/historico-treino-service/historico-treino.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usuario-treino',
  templateUrl: './usuario-treino.component.html',
  styleUrls: ['./usuario-treino.component.scss'],
})
export class UsuarioTreinoComponent implements OnInit {
  tipoTreino: string = '';
  dataAtual: string = moment().format('DD/MM/YYYY');
  nomeTreino: string = '';
  usuarioId: string = '';
  idFicha: string = '';
  quantidadeTreinoTotal: number = 0;
  qtdTreinoAtual: number = 0;

  constructor(
    private localStorage: LocalstorageService,
    private snack: MatSnackBar,
    private translate: TranslateService,
    private router: Router,
    private historicoTreinoService: HistoricoTreinoService
  ) {}

  ngOnInit(): void {
    const usuario = this.localStorage.obter('usuario') as any;
    if (usuario) {
      this.historicoTreinoService
        .obterHistoricoUsuarioFicha(usuario.id, usuario.idFicha)
        .subscribe(
          (res) => {
            this.nomeTreino = res[0].ficha.nome;
            this.quantidadeTreinoTotal = res[0].ficha.qtdTreino;
            this.idFicha = res[0].ficha.id;

            const fichasHistoricoOrdenada = res.sort((x: any) => {
              x.ficha.qtdTreino;
            });
            const ficha = res[0].ficha;
            const listaGrupos = ficha.tiposGrupamento;
            const ultimoGrupo = listaGrupos[listaGrupos.length - 1];
            console.log(ficha);
            const ultimoTreino =
              fichasHistoricoOrdenada[fichasHistoricoOrdenada.length - 1];
            this.qtdTreinoAtual = res.length - 1;
            
            if(this.qtdTreinoAtual === -1){
              this.qtdTreinoAtual = 0;
            }

            if (!ultimoTreino.tipoAtual) {
              this.tipoTreino = ultimoTreino.ficha.tiposGrupamento[0];
            }

            if (ultimoTreino.tipoAtual === ultimoGrupo) {
              this.tipoTreino = ultimoTreino.ficha.tiposGrupamento[0];
              
            } else {
              const tipoTreinoAtual = ultimoTreino.ficha.tiposGrupamento.find(
                (x: any) => x === ultimoTreino.tipoAtual
              );
              const indicieAtualTreino =
                ultimoTreino.ficha.tiposGrupamento.indexOf(tipoTreinoAtual);
              
              this.tipoTreino =
                ultimoTreino.ficha.tiposGrupamento[indicieAtualTreino + 1];
            }
            this.localStorage.adicionar('ficha', res[0].ficha);
          },
          (err) => {
            this.snack.open(
              this.translate.instant('usuarioFicha.msgUsuarioSemFicha'),
              'OK',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            this.router.navigate(['/home-usuario/']);
          }
        );
    }
  }

  inciarTreino() {
    this.router.navigate([
      '/treino-core/' +
        this.idFicha +
        '/' +
        this.tipoTreino +
        '/' +
        this.qtdTreinoAtual,
    ]);
  }

  historicoUsuario() {
    this.router.navigate(['/usuario-historico/']);
  }
}
