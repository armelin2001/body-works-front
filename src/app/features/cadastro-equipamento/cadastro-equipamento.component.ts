import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { IEquipamentoDTO } from 'src/app/shared/models/equipamento.dto';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-equipamento',
  templateUrl: './cadastro-equipamento.component.html',
  styleUrls: ['./cadastro-equipamento.component.scss']
})
export class CadastroEquipamentoComponent {
  formularioEquipamento: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private equipamentoService: EquipamentoService
  ){
    this.formularioEquipamento = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    })
  }

  submitFormEquipamento(){
    const equipamento = this.getEquipamento();
    this.equipamentoService.cadastroEquipamento(equipamento).subscribe(
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
    const nome = this.formularioEquipamento.get('nome') as FormControl;
    if (nome.value.length < 3) {
      nome.setErrors({ nomeInvalido: true });
    }
    return this.formularioEquipamento.get('nome') as FormControl;
  }
  get tipo(): FormControl {
    const tipo = this.formularioEquipamento.get('tipo') as FormControl;
    if (tipo.value.length < 1) {
      tipo.setErrors({ tipoInvalido: true });
    }
    return this.formularioEquipamento.get('tipo') as FormControl;
  }

  getEquipamento(){
    const formularioEquipamento = this.formularioEquipamento.value;
    const equipamento: IEquipamentoDTO = {
      nome: formularioEquipamento.nome,
      tipo: formularioEquipamento.tipo
    }
    return equipamento
  }

}
