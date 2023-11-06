import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { IExercicioDTO, TIPO_EXERCICIO, NIVEL_DIFICULDADE } from 'src/app/shared/models/exercicio.dto';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';


@Component({
  selector: 'app-edit-exercicio',
  templateUrl: './edit-exercicio.component.html',
  styleUrls: ['./edit-exercicio.component.scss']
})
export class EditExercicioComponent implements OnInit{
  formularioExercicio: FormGroup;
  equipamentos: any[] = [];
  id: string = '';
  tiposExercicio = TIPO_EXERCICIO;
  dificuldadesExercicio = NIVEL_DIFICULDADE;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private exercicioService: ExercicioService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private equipamentoService: EquipamentoService,
  ) {
    this.formularioExercicio = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipoExercicio: ['', [Validators.required]],
      equipamentoNecessario: ['', [Validators.required]],
      nivelDificuldade: ['', [Validators.required]],
      videoDemonstrativo: ['', [Validators.required]],
      musculosTrabalhados: ['', [Validators.required]],
    });
  }


  submitFormExercicio() {
    const exercicio = this.getExercicio();
    this.exercicioService.atualizaExercicioPorId(exercicio).subscribe(
      (res) => {
        this.router.navigate(['/visualiza-exercicio']);
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.exercicioService.obterExercicioPorId(this.id).subscribe(
      (res) => {
        this.formularioExercicio.patchValue({
          nome: res.nome,
          tipoExercicio: res.tipo,
          equipamentoNecessario: res.equipamentoNecessario,
          nivelDificuldade: res.nivelDificuldade,
          videoDemonstrativo: res.videoDemonstrativo,
          musculosTrabalhados: res.musculosTrabalhados,
        });
      },
      (err) => {
        this.snack.open(err.error.message, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
    this.equipamentoService.obterTodosEquipamentos().subscribe(data => {
      this.equipamentos = data.dados;
    });
  }

  goBack() {
    this.router.navigate(['/home-usuario/']);
  }

  get nome(): FormControl {
    const nome = this.formularioExercicio.get('nome') as FormControl;
    if (nome.value.length < 3) {
      nome.setErrors({ nomeInvalido: true });
    }
    return this.formularioExercicio.get('nome') as FormControl;
  }
  get tipoExercicio(): FormControl {
    const tipoExercicio = this.formularioExercicio.get('tipoExercicio') as FormControl;
    if (tipoExercicio.value.length < 1) {
      tipoExercicio.setErrors({ tipoExercicioInvalido: true });
    }
    return this.formularioExercicio.get('tipoExercicio') as FormControl;
  }
  get equipamentoNecessario(): FormControl {
    const equipamentoNecessario = this.formularioExercicio.get('equipamentoNecessario') as FormControl;
    if (equipamentoNecessario.value.length < 5) {
      equipamentoNecessario.setErrors({ equipamentoNecessario: true });
    }
    return this.formularioExercicio.get('equipamentoNecessario') as FormControl;
  }
  get nivelDificuldade(): FormControl {
    const nivelDificuldade = this.formularioExercicio.get('nivelDificuldade') as FormControl;
    if (nivelDificuldade.value.length < 1) {
      nivelDificuldade.setErrors({ nivelDificuldade: true });
    }
    return this.formularioExercicio.get('nivelDificuldade') as FormControl;
  }
  get videoDemonstrativo(): FormControl {
    const videoDemonstrativo = this.formularioExercicio.get('videoDemonstrativo') as FormControl;
    if (videoDemonstrativo.value.length < 10) {
      videoDemonstrativo.setErrors({ videoDemonstrativo: true });
    }
    return this.formularioExercicio.get('videoDemonstrativo') as FormControl;
  }
  get musculosTrabalhados(): FormControl {
    const musculosTrabalhados = this.formularioExercicio.get('musculosTrabalhados') as FormControl;
    if (musculosTrabalhados.value.length < 5) {
      musculosTrabalhados.setErrors({ musculosTrabalhados: true });
    }
    return this.formularioExercicio.get('musculosTrabalhados') as FormControl;
  }

  getExercicio() {
    const formularioExercicio = this.formularioExercicio.value;
    const exercicio: IExercicioDTO = {
      id: this.id,
      nome: formularioExercicio.nome,
      tipoExercicio: formularioExercicio.tipoExercicio,
      equipamentoNecessario: formularioExercicio.equipamentoNecessario,
      nivelDificuldade: formularioExercicio.nivelDificuldade,
      videoDemonstrativo: formularioExercicio.videoDemonstrativo,
      musculosTrabalhados: formularioExercicio.musculosTrabalhados
    };
    return exercicio;
  }
}
