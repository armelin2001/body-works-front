import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { IEquipamentoDTO } from 'src/app/shared/models/equipamento.dto';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-equipamento',
  templateUrl: './edit-equipamento.component.html',
  styleUrls: ['./edit-equipamento.component.scss'],
})
export class EditEquipamentoComponent implements OnInit {
  formularioEquipamento: FormGroup;
  id: string = '';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private equipamentoService: EquipamentoService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioEquipamento = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });
  }

  submitFormEquipamento() {
    const equipamento = this.getEquipamento();
    this.equipamentoService.atualizaEquipamentoPorId(equipamento).subscribe(
      (res) => {
        this.router.navigate(['/visualiza-equipamentos']);
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.equipamentoService.obterEquipamentoPorId(this.id).subscribe(
      (res) => {
        this.formularioEquipamento.patchValue({
          nome: res.nome,
          tipo: res.tipo,
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
  }

  goBack() {
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

  getEquipamento() {
    const formularioEquipamento = this.formularioEquipamento.value;
    const equipamento: IEquipamentoDTO = {
      id: this.id,
      nome: formularioEquipamento.nome,
      tipo: formularioEquipamento.tipo,
    };
    return equipamento;
  }
}
