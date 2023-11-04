import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class TreinoService {
  urlbase = environment.host + '/treino';

  constructor(private http: HttpClient) {}

  obterTreinoPorId(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  obterTreinosPorIdUsuario(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/usuario/${id}`);
  }

  obterComentariosTreinoUsuario(idUsuario: string): Observable<any> {
    return this.http.get(`${this.urlbase}/usuario/comentarios/${idUsuario}`);
  }

  obterComentariosTreinosInstrutor(idInstrutor: string): Observable<any> {
    return this.http.get(
      `${this.urlbase}/instrutor/comentarios/${idInstrutor}`
    );
  }

  criarTreino(treino: any): Observable<any> {
    return this.http.post(`${this.urlbase}`, treino);
  }
}
