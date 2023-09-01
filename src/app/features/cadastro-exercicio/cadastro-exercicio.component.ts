import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercicioService } from 'src/app/shared/http-service/exercicio-service/exercicio.service';
import { IExercicioDTO } from 'src/app/shared/models/exercicio.dto';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';

@Component({
  selector: 'app-cadastro-exercicio',
  templateUrl: './cadastro-exercicio.component.html',
  styleUrls: ['./cadastro-exercicio.component.scss']
})
export class CadastroExercicioComponent {
  formularioExercicio: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private exercicioService: ExercicioService
  ){
    this.formularioExercicio = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipoExercicio: ['', [Validators.required]],
      equipamento: ['', [Validators.required]],
      nivelDificuldade: ['', [Validators.required]],
      tempo: ['', [Validators.required]],
      frequencia: ['', [Validators.required]],
      video: ['', [Validators.required]],
      instrucoes: ['', [Validators.required]],
      musculos: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
      equipamentoNecessario: [''],
    })
  }
  equipamentos: any[] = [];

  ngOnInit() {
    this.equipamentoService.obterTodosEquipamentos().subscribe(data => {
      this.equipamentos = data.dados;
    });
  
  }


  submitFormExercicio(){
    const exercicio = this.getExercicio();
    this.exercicioService.cadastroExercicio(exercicio).subscribe(
      (res) => {
        this.goBack();
      },
      (err) =>{}
    )
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

  getExercicio(){
    const formularioExercicio = this.formularioExercicio.value;
    const exercicio: IExercicioDTO = {
      nome: formularioExercicio.nome,
      tipo: formularioExercicio.tipo
    }
    return exercicio
  }

}
