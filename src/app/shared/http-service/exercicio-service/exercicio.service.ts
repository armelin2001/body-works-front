import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IExercicioDTO } from '../../models/exercicio.dto';

@Injectable()
export class ExercicioService {
  urlbase = environment.host + '/exercicio';

  constructor(private http: HttpClient) {}

  cadastroExercicio(exercicioAcademia: IExercicioDTO): Observable<any> {
    return this.http.post(`${this.urlbase}`, exercicioAcademia);
  }

  obterExercicioPorId(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  atualizaExercicioPorId(exercicioAcademia: IExercicioDTO): Observable<any> {
    return this.http.patch(
      `${this.urlbase}/${exercicioAcademia.id}`,
      exercicioAcademia
    );
  }

  obterTodosExercicios(): Observable<any> {
    return this.http.get(`${this.urlbase}`);
  }

  deletarExercicio(id: string): Observable<any> {
    return this.http.delete(`${this.urlbase}/${id}`);
  }
}
