import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { FichaService } from 'src/app/shared/http-service/ficha-service/ficha.service';
import { IExercicioDTO } from 'src/app/shared/models/exercicio.dto';
import { LocalstorageService } from 'src/app/shared/local-storage/localstorage.service';
import { IExercicioFicha } from 'src/app/shared/models/ficha.dto';

interface TipoTreino {
  tipo: string;
  preenchido: boolean;
}

@Component({
  selector: 'app-cadastro-ficha',
  templateUrl: './cadastro-ficha.component.html',
  styleUrls: ['./cadastro-ficha.component.scss'],
})
export class CadastroFichaComponent {
  fichaForm: FormGroup;
  tiposTreino: string[] = [];
  listaExercicios: IExercicioDTO[] = [];
  tiposExercicioCheckBox = this.formBuilder.group({
    A: true,
    B: true,
    C: false,
    D: false,
    E: false,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fichaService: FichaService,
    private localStorage: LocalstorageService,
    private exercicioService: ExercicioService
  ) {
    this.exercicioService.obterTodosExercicios().subscribe((res) => {
      res.dados.forEach((element: any) => {
        const exercicio: IExercicioDTO = {
          id: element.id,
          nome: element.nome,
          descricao: element.descricao,
          tipoExercicio: element.tipoExercicio,
          equipamentoNecessario: element.equipamentoNecessario,
          nivelDificuldade: element.nivelDificuldade,
          tempoRecomendado: element.tempoRecomendado,
          videoDemonstrativo: element.videoDemonstrativo,
          instrucoesPassoAPasso: element.instrucoesPassoAPasso,
          musculosTrabalhados: element.musculosTrabalhados,
          observacoes: element.observacoes,
        };
        this.listaExercicios.push(exercicio);
      });
    });
    this.fichaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoTreino: this.formBuilder.group(this.tiposExercicioCheckBox),
      descricao: [''],
      exercicios: this.formBuilder.array([this.criaExercicioFormGroup()]),
    });
  }

  get exercicios(): FormArray {
    return this.fichaForm.get('exercicios') as FormArray;
  }

  public removerExercicio(i: number) {
    const exercicios = this.fichaForm.get('exercicios') as FormArray;
    if (exercicios.length > 1) {
      exercicios.removeAt(i);
    } else {
      exercicios.reset();
    }
  }

  public adicionaExercicioFromGroup() {
    const exercicios = this.fichaForm.get('exercicios') as FormArray;
    exercicios.push(this.criaExercicioFormGroup());
  }

  private criaExercicioFormGroup(): FormGroup {
    return new FormGroup({
      idExercicio: new FormControl('', Validators.required),
      series: new FormControl('', Validators.required),
      repeticoes: new FormControl('', Validators.required),
      tempoIntervaloMinutos: new FormControl('', Validators.required), // adicionar validação
      tempoIntervaloSegundos: new FormControl('', Validators.required), // adicionar validação
      tipoGrupamento: new FormControl('', Validators.required),
    });
  }

  subimitFormFicha() {
    const formularioValues = this.fichaForm.value;
    let tiposTreino: TipoTreino[] = [];
    const tipoA = this.fichaForm.value.tipoTreino.controls.A.value;
    const tipoB = this.fichaForm.value.tipoTreino.controls.B.value;
    const tipoC = this.fichaForm.value.tipoTreino.controls.C.value;
    const tipoD = this.fichaForm.value.tipoTreino.controls.D.value;
    const tipoE = this.fichaForm.value.tipoTreino.controls.E.value;
    tiposTreino.push({ tipo: 'A', preenchido: tipoA });
    tiposTreino.push({ tipo: 'B', preenchido: tipoB });
    tiposTreino.push({ tipo: 'C', preenchido: tipoC });
    tiposTreino.push({ tipo: 'D', preenchido: tipoD });
    tiposTreino.push({ tipo: 'E', preenchido: tipoE });
    tiposTreino = tiposTreino.filter((element) => element.preenchido === true);
    const tiposTreinoString: string[] = [];
    tiposTreino.forEach((element) => {
      if (element.preenchido) {
        tiposTreinoString.push(element.tipo);
      }
    });
    const usuario = this.localStorage.obter('usuario') as any;
    const idInstrutor = String(usuario.id);
    /*const exercicios: IExercicioFicha[] = [];
    console.log(formularioValues.exercicios);
    formularioValues.exercicios.forEach((element: any) => {
      this.exercicios.push(
        {
          idExercicio: element.nome,
          series: element.series,
          repeticoes: element.repeticoes,
          tempoIntervaloMinutos: element.tempoIntervaloMinutos,
          tempoIntervaloSegundos: element.tempoIntervaloSegundos,
          tipoGrupamento: element.tipoTreino,
        }
      );
    });*/
    const ficha = {
      idInstrutor: idInstrutor,
      nome: String(formularioValues.nome),
      descricao: String(formularioValues.descricao) || '',
      tiposGrupamento: tiposTreinoString,
      exercicios: formularioValues.exercicios,
    };
    this.fichaService.salvarFicha(ficha).subscribe(
      (res) => {
        this.goBack();
      },
      (err) => {}
    );
  }

  goBack(): void {
    this.router.navigate(['/home-usuario/']);
  }

  mostraFormConsole() {
    console.log(this.fichaForm.value);
    const x = this.fichaForm.value.tipoTreino.controls.A.value;
    console.log(x);
  }

  checkBox(event: string) {
    const valorCheckBox = this.tiposTreino.find((element) => element === event);
    if (!valorCheckBox) {
      this.tiposTreino.push(event);
    } else {
      this.tiposTreino = this.tiposTreino.filter(
        (element) => element !== event
      );
    }
    this.tiposTreino.sort();
  }
}
