import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { HistoricoTreinoService } from 'src/app/shared/http-service/historico-treino-service/historico-treino.service';
import { PresencaService } from 'src/app/shared/http-service/presenca/presenca.service';
import { TreinoService } from 'src/app/shared/http-service/treino-service/treino.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { IExercicioDTO } from 'src/app/shared/models/exercicio.dto';
import {
  IExercicioFicha,
  IExercicioFichaTreino,
  TipoTreino,
} from 'src/app/shared/models/ficha.dto';
import { IHistoricoTreino } from 'src/app/shared/models/historico-treino.dto';
import { IPresencaDTO } from 'src/app/shared/models/presenca.dto';
import { ExercicioTreinoDto } from 'src/app/shared/models/treino.dto';

@Component({
  selector: 'app-usuario-treino-core',
  templateUrl: './usuario-treino-core.component.html',
  styleUrls: ['./usuario-treino-core.component.scss'],
})
export class UsuarioTreinoCoreComponent implements OnInit {
  exercicioFicha: IExercicioFicha[] = [];
  exercicioTreino: IExercicioFichaTreino[] = [];
  exercicios: IExercicioDTO[] = [];
  listaExerciciosConcluidos: ExercicioTreinoDto[] = [];
  minutos: number = 0;
  segundos: number = 0;
  horas: number = 0;
  cronometroRodando: boolean = false;
  intervalId: any;
  dataAtual = moment().toDate();
  qtdExercicios: number = 0;
  exerciciosFeitos: number = 0;
  totalBarraProgresso: number = 100;
  progressoAtual: number = 0;
  qtdExercicioBarra: number = 0;
  bloqueiaEnvio: boolean = false;
  tipoTreino: TipoTreino = 'A';
  treinoForm: FormGroup;
  qtdTreinoAtual: number = 0;
  presenca: IPresencaDTO;

  constructor(
    private localStorage: LocalstorageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private treinoService: TreinoService,
    private router: Router,
    private historicoTreinoService: HistoricoTreinoService,
    private snack: MatSnackBar,
    private translate: TranslateService,
    private presencaService: PresencaService,
    private exercicioService: ExercicioService
  ) {
    this.presenca = {
      idUsuario: '',
      dataInicio: moment().format('YYYY-MM-DD:HH:mm:ss').toString(),
      dataFim: moment().format('YYYY-MM-DD:HH:mm:ss').toString(),
    };
    this.treinoForm = this.formBuilder.group({
      comentario: [''],
    });
  }

  ngOnInit(): void {
    const ficha = this.localStorage.obter('ficha') as any;

    const usuario = this.localStorage.obter('usuario') as any;
    const idUsuario = usuario.id;
    this.presenca.idUsuario = idUsuario;
    this.presencaService.criarPresenca(this.presenca).subscribe((res) => {
      this.presenca.id = res.id;
    });

    this.tipoTreino = this.activatedRoute.snapshot.params['tipoTreino'];
    this.qtdTreinoAtual = this.activatedRoute.snapshot.params['qtdTreino'];
    this.exercicioFicha = ficha.exercicios;

    this.exercicioService.obterTodosExercicios().subscribe((res) => {
      const listaExercicios = res.dados;

      this.exercicioFicha.forEach((exercicioFicha) => {
        const exercicio = listaExercicios.find(
          (exercicio: any) => exercicio.id === exercicioFicha.idExercicio
        );

        if (exercicio && exercicioFicha.tipoGrupamento === this.tipoTreino) {
          this.exercicioTreino.push({
            ...exercicioFicha,
            videoDemonstrativo: exercicio.videoDemonstrativo,
            observacoes: exercicio.observacoes,
            nome: exercicio.nome,
            idEquipamento: exercicio.equipamentoNecessario,
          });
        }
      });

      console.log("LISTA EXERCICIOS -> ", this.exercicioTreino);
      this.qtdExercicios = this.exercicioTreino.length;
      this.qtdExercicioBarra = this.totalBarraProgresso / this.qtdExercicios;
    });

    this.iniciarCronometro();
  }

  iniciarCronometro() {
    this.reiniciarCronometro();
    if (!this.cronometroRodando) {
      this.intervalId = setInterval(() => {
        this.segundos++;

        if (this.segundos === 60) {
          this.segundos = 0;
          this.minutos++;
        }

        if (this.minutos === 60) {
          this.minutos = 0;
          this.horas++;
        }
      }, 1000);
      this.cronometroRodando = true;
    }
  }

  pararCronometro() {
    clearInterval(this.intervalId);
    this.cronometroRodando = false;
  }

  reiniciarCronometro() {
    this.minutos = 0;
    this.segundos = 0;
    this.pararCronometro();
  }

  recebeExerciciosRealizados(event: any) {
    this.exerciciosFeitos++;
    this.progressoAtual = this.progressoAtual + this.qtdExercicioBarra;

    if (this.totalBarraProgresso === this.progressoAtual) {
      this.bloqueiaEnvio = true;
    }

    const carga: number[] = [];
    const repeticoes: number[] = [];
    const listaCargaTotal: number[] = [];
    const series = event.length;
    let totalRepeticoes = 0;
    let totalCarga = 0;
    let cargaMedia = 0;

    event.forEach((element: any) => {
      carga.push(element.carga);
      repeticoes.push(Number(element.repeticoes));
    });

    for (let i = 0; i < series; i++) {
      listaCargaTotal.push(carga[i] * repeticoes[i]);
    }

    repeticoes.forEach((repeticao: number) => {
      totalRepeticoes = totalRepeticoes + repeticao;
    });

    listaCargaTotal.forEach((carga: number) => {
      totalCarga = totalCarga + carga;
    });

    cargaMedia = totalCarga / totalRepeticoes;

    this.listaExerciciosConcluidos.push({
      idExercicio: event[0].idExercicio,
      carga: carga,
      repeticoes: repeticoes,
      series: series,
      cargaMedia: Number(cargaMedia.toFixed(2)),
    });
  }

  cancelaTreino() {
    const dataFim = moment().format('YYYY-MM-DD:HH:mm:ss').toString();
    this.presenca.dataFim = dataFim;
    this.presencaService
      .atualizarPresenca(this.presenca, this.presenca.id || '')
      .subscribe(() => {
        this.router.navigate(['/home-usuario/']);
      });
  }

  enviarTreino() {
    const formExercicio = this.treinoForm.value;
    const ficha = this.localStorage.obter('ficha') as any;
    const usuario = this.localStorage.obter('usuario') as any;
    const dataAtual = moment().toDate();
    const idUsuario = usuario.id;

    const treino = {
      idUsuario: idUsuario,
      idFicha: ficha.id,
      dataTreino: dataAtual,
      comentario: formExercicio.comentario,
      exercicios: this.listaExerciciosConcluidos,
    };

    const historicoTreino: IHistoricoTreino = {
      tipoAtual: this.tipoTreino,
      qtdAtualTreino: this.qtdTreinoAtual + 1,
      idFichaTreino: ficha.id,
      ficha: ficha,
      idUsuario: usuario.id,
      dataTreino: dataAtual,
    };

    this.treinoService.criarTreino(treino).subscribe((res) => {
      const historicoTreinoEnvio = {
        ...historicoTreino,
        idTreino: res.id,
      };
      const dataFim = moment().format('YYYY-MM-DD:HH:mm:ss').toString();
      this.presenca.dataFim = dataFim;
      this.presencaService
        .atualizarPresenca(this.presenca, this.presenca.id || '')
        .subscribe((res) => {
          console.log(res);
        });
      this.historicoTreinoService
        .cadastrarHistorico(historicoTreinoEnvio)
        .subscribe((res) => {
          this.snack.open(
            this.translate.instant('treino.msgSucesso'),
            this.translate.instant('treino.fechar'),
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/home-usuario/']);
        });
    });
  }
}
