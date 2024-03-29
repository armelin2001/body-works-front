import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { IExercicioDTO, TIPO_EXERCICIO, NIVEL_DIFICULDADE } from 'src/app/shared/models/exercicio.dto';
import { Router } from '@angular/router';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cadastro-exercicio',
  templateUrl: './cadastro-exercicio.component.html',
  styleUrls: ['./cadastro-exercicio.component.scss']
})
export class CadastroExercicioComponent implements OnInit{
  formularioExercicio: FormGroup;
  equipamentos: any[] = [];
  tiposExercicio = TIPO_EXERCICIO;
  dificuldadesExercicio = NIVEL_DIFICULDADE;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private snack: MatSnackBar,
    private exercicioService: ExercicioService,
    private translateService: TranslateService,
  ) {
    this.formularioExercicio = this.formBuilder.group({
    nome: ['', [Validators.required]],
    tipoExercicio: ['', [Validators.required]],
    equipamentoNecessario: ['', [Validators.required]],
    nivelDificuldade: ['', [Validators.required]],
    videoDemonstrativo: ['', [Validators.required]],
    musculosTrabalhados: ['', [Validators.required]],
  })}

  ngOnInit() {
    this.equipamentoService.obterTodosEquipamentos().subscribe(data => {
      this.equipamentos = data.dados;
    });
    
  }


  submitFormExercicio(){
    if (this.formularioExercicio.valid) {
      const exercicio: IExercicioDTO = this.formularioExercicio.value;
      this.exercicioService.cadastroExercicio(exercicio).subscribe(
        () => {
          this.snack.open(
            this.translateService.instant('tsCadExercicio.barraCadSucesso'),
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.router.navigate(['/visualiza-exercicios/']);
        },
        error => {
          this.snack.open(
            this.translateService.instant('tsCadExercicio.barraCadErro'),
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
    } else {
      alert(this.translateService.instant('tsCadExercicio.alertCadExercicio'),);
    }
  }

  goBack(){
    this.router.navigate(['/home-usuario/']);
  }

  get nome(): FormControl {
    const nome = this.formularioExercicio.get('nome') as FormControl;
    if (nome.value.length < 3) {
      nome.setErrors({ nomeInvalido: true });
    }
    return this.formularioExercicio.get('nome') as FormControl;
  }
  get tipo(): FormControl {
    const tipo = this.formularioExercicio.get('tipo') as FormControl;
    if (tipo.value.length < 1) {
      tipo.setErrors({ tipoInvalido: true });
    }
    return this.formularioExercicio.get('tipo') as FormControl;
  }

  getExercicio() {
    const formularioExercicio = this.formularioExercicio.value;
    const exercicio: IExercicioDTO = {
      nome: formularioExercicio.nome,
      tipoExercicio: formularioExercicio.tipoExercicio,
      equipamentoNecessario: formularioExercicio.equipamentoNecessario,
      nivelDificuldade: formularioExercicio.nivelDificuldade,
      videoDemonstrativo: formularioExercicio.videoDemonstrativo,
      musculosTrabalhados: formularioExercicio.musculosTrabalhados
    }
    return exercicio;
  }

}
