import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { IExercicioDTO, TIPO_EXERCICIO, NIVEL_DIFICULDADE } from 'src/app/shared/models/exercicio.dto';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';

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
    private location: Location,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private exercicioService: ExercicioService
  ) {
    this.formularioExercicio = this.formBuilder.group({
    nome: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    tipoExercicio: ['', [Validators.required]],
    equipamentoNecessario: ['', [Validators.required]],
    nivelDificuldade: ['', [Validators.required]],
    tempoRecomendado: ['', [Validators.required]],
    videoDemonstrativo: ['', [Validators.required]],
    instrucoesPassoAPasso: ['', [Validators.required]],
    musculosTrabalhados: ['', [Validators.required]],
    observacoes: ['', [Validators.required]],
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
          alert('Exercício cadastrado com sucesso!');
          this.formularioExercicio.reset();
        },
        error => {
          console.error("Erro ao cadastrar exercício:", error);
          alert('Erro ao cadastrar exercício. Por favor, tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
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
      descricao: formularioExercicio.descricao,
      tipoExercicio: formularioExercicio.tipoExercicio,
      equipamentoNecessario: formularioExercicio.equipamentoNecessario,
      nivelDificuldade: formularioExercicio.nivelDificuldade,
      tempoRecomendado: formularioExercicio.tempoRecomendado,
      instrucoesPassoAPasso: formularioExercicio.instrucoes,
      musculosTrabalhados: formularioExercicio.musculosTrabalhados,
      observacoes: formularioExercicio.observacoes,
      videoDemonstrativo: formularioExercicio.videoDemonstrativo
    }
    return exercicio;
  }

}
