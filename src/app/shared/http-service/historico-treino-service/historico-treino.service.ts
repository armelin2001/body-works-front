import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class HistoricoTreinoService {
  urlbase = environment.host + '/historico-treino';

  constructor(private http: HttpClient) {}

  obterHistoricoTreinoPorId(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  obterHistoricoUsuario(idUsuario: string): Observable<any> {
    return this.http.get(`${this.urlbase}/usuario/${idUsuario}`);
  }

  obterHistoricoUsuarioFicha(
    idUsuario: string,
    idFicha: string
  ): Observable<any> {
    return this.http.get(`${this.urlbase}/usuario-ficha/${idUsuario}/${idFicha}`);
  }

  cadastrarHistorico(historicoTreino: any): Observable<any> {
    return this.http.post(`${this.urlbase}`, historicoTreino);
  }
}
