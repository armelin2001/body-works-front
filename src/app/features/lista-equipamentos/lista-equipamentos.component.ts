import { Component, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/shared/http-service/equipamento-service/equipamento.service';
import { EquipamentoDto } from 'src/app/shared/models/equipamento-dto';

@Component({
  selector: 'app-equipamento-list',
  templateUrl: './lista-equipamentos.component.html',
  styleUrls: ['./lista-equipamentos.component.scss']
})
export class EquipamentoListComponent implements OnInit {
  equipamentos: EquipamentoDto[] = [];

  constructor(private equipamentoService: EquipamentoService) { }

  ngOnInit() {
    this.equipamentoService.getEquipamentos().subscribe(
      equipamentos => this.equipamentos = equipamentos
    );
  }

}
