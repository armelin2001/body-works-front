import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { EquipamentoDto } from '../../models/equipamento-dto'

@Injectable()
export class EquipamentoService {
  urlbase = environment.host + '/equipamento';

  constructor(private http: HttpClient) {}

  getEquipamentos(): Observable<EquipamentoDto[]> {
    return this.http.get<{dados: EquipamentoDto[], quantidade: number}>('http://localhost:52556/lista-equipamentos')
      .pipe(map(response => response.dados));
  }
  
}