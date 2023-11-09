import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { IExercicio, IExercicioFicha } from 'src/app/shared/models/ficha.dto';

@Component({
  selector: 'app-exercicio-treino',
  templateUrl: './exercicio-treino.component.html',
  styleUrls: ['./exercicio-treino.component.scss'],
})
export class ExercicioTreinoComponent implements OnInit {
  @Input()
  exercicio!: IExercicioFicha;
  @Input()
  series: number = 0;
  @Input()
  observacoes: string | undefined = '';
  @Input()
  nome: string | undefined = '';
  @Input()
  minutes: number = 1;
  @Input()
  seconds: number = 0;
  @Input()
  videoDemonstrativo: string | undefined;
  @Input()
  idEquipamento: string = '';
  @Input()
  repeticoes: number = 0;

  @Output()
  listaExercicios = new EventEmitter<IExercicio[]>();

  nomeEquipamento: string = '';
  tipoEquipamento: string = '';

  tempoIntervaloMinutos: number = 0;
  tempoIntervaloSegundos: number = 0;

  intervalId: any;
  cronometroRodando: boolean = false;
  exercicioCompleto: boolean = false;
  desabilitaForm: boolean = false;

  exercicioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private equipamentoService: EquipamentoService
  ) {
    this.exercicioForm = this.formBuilder.group({
      linhasExercicio: this.formBuilder.array([]),
    });
    this.equipamentoService
      .obterEquipamentoPorId(this.idEquipamento)
      .subscribe((res) => {
        const equipamento = res.dados.find(
          (element: any) => element.id === this.idEquipamento
        );
        this.nomeEquipamento = equipamento.nome;
        this.tipoEquipamento = equipamento.tipo;
      });
  }

  get linhasExercicio(): FormArray {
    return this.exercicioForm.get('linhasExercicio') as FormArray;
  }

  ngOnInit(): void {
    console.log('EXERCICIO', this.exercicio);
    this.tempoIntervaloMinutos = this.minutes;
    this.tempoIntervaloSegundos = this.seconds;
    const linhasExercicio: FormGroup[] = [];

    for (let i = 0; i < this.series; i++) {
      linhasExercicio.push(this.criaLinhaExercicio());
    }
    this.exercicioForm.setControl(
      'linhasExercicio',
      this.formBuilder.array(linhasExercicio)
    );
  }

  private criaLinhaExercicio(): FormGroup {
    const linhaExercicio = new FormGroup({
      carga: new FormControl('', Validators.required),
      repeticoes: new FormControl(String(this.exercicio.repeticoes), Validators.required),
    });
    return linhaExercicio;
  }

  startCountdown() {
    this.reiniciarContagem();

    this.intervalId = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          clearInterval(this.intervalId);
        }
      }
    }, 1000);
  }

  reiniciarContagem() {
    clearInterval(this.intervalId);
    this.minutes = this.tempoIntervaloMinutos;
    this.seconds = this.tempoIntervaloSegundos;
  }

  redirecionarVideo() {
    window.open(this.videoDemonstrativo || '', '_blank');
  }

  completarExercicio() {
    const listaExercicios = this.linhasExercicio.value;
    const listaRetorno: IExercicio[] = [];
    listaExercicios.forEach((element: any) => {
      listaRetorno.push({
        idExercicio: this.exercicio.idExercicio,
        repeticoes: element.repeticoes,
        carga: element.carga,
      });
      element.idExercicio = this.exercicio.idExercicio;
    });
    this.exercicioCompleto = true;
    this.desabilitaForm = true;
    this.listaExercicios.emit(listaRetorno);
    //this.listaExercicios.emit(this.linhasExercicio.value);
  }
}
