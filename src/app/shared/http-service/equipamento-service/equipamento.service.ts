import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../../models/login-dto';
import { environment } from 'src/enviroments/environment';
import { IEquipamentoDTO } from '../../models/equipamento.dto';

@Injectable()
export class EquipamentoService {
  urlbase = environment.host + '/equipamento';

  constructor(private http: HttpClient) {}

  cadastroEquipamento(equipamentoAcademia: IEquipamentoDTO): Observable<any> {
    return this.http.post(`${this.urlbase}`, equipamentoAcademia);
  }

  obterEquipamentoPorId(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  atualizaEquipamentoPorId(equipamentoAcademia: IEquipamentoDTO): Observable<any> {
    return this.http.patch(`${this.urlbase}/${equipamentoAcademia.id}`, equipamentoAcademia);
  }
  
  obterTodosEquipamentos(): Observable<any> {
    return this.http.get(`${this.urlbase}`);
  }

  deletarEquipamento(id: string): Observable<any> {
    return this.http.delete(`${this.urlbase}/${id}`);
  }
}
