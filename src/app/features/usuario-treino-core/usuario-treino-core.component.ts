import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { HistoricoTreinoService } from 'src/app/shared/http-service/historico-treino-service/historico-treino.service';
import { TreinoService } from 'src/app/shared/http-service/treino-service/treino.service';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { IExercicioDTO } from 'src/app/shared/models/exercicio.dto';
import {
  IExercicioFicha,
  IExercicioFichaTreino,
  TipoTreino,
} from 'src/app/shared/models/ficha.dto';
import { IHistoricoTreino } from 'src/app/shared/models/historico-treino.dto';
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

  constructor(
    private localStorage: LocalstorageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private treinoService: TreinoService,
    private router: Router,
    private historicoTreinoService: HistoricoTreinoService,
    private snack: MatSnackBar,
    private exercicioService: ExercicioService
  ) {
    this.treinoForm = this.formBuilder.group({
      comentario: [''],
    });
  }

  ngOnInit(): void {
    const ficha = this.localStorage.obter('ficha') as any;
    this.tipoTreino = this.activatedRoute.snapshot.params['tipoTreino'];
    this.qtdTreinoAtual = this.activatedRoute.snapshot.params['qtdTreino'];
    this.exercicioFicha = ficha.exercicios;
    console.log(ficha);

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
    const series = event.length;

    event.forEach((element: any) => {
      carga.push(element.carga);
      repeticoes.push(element.repeticoes);
    });

    this.listaExerciciosConcluidos.push({
      idExercicio: event[0].idExercicio,
      carga: carga,
      repeticoes: repeticoes,
      series: series,
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
    
    this.treinoService.criarTreino(treino).subscribe(
      (res) => {
        const historicoTreinoEnvio = {
          ...historicoTreino,
          idTreino: res.id,
        };

        this.historicoTreinoService.cadastrarHistorico(historicoTreinoEnvio).subscribe(
          (res) => {
        
            this.snack.open('Treino concluido com sucesso parabens!!!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
        
            this.router.navigate(['/home-usuario/']);
          }
        );
      }
    );
  }
}
