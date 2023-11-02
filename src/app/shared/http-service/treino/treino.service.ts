import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable()
export class TreinoService {
  urlbase = environment.host + '/treino';

  constructor(private http: HttpClient) {}

  obterTreinoPorId(id: string) {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  obterTodosTreinos() {
    return this.http.get(`${this.urlbase}`);
  }

  cadastrarTreino(treino: any): Observable<any> {
    return this.http.post(`${this.urlbase}`, treino);
  }
}
