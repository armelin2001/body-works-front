import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IExercicioFicha } from '../../models/ficha.dto';

@Injectable()
export class FichaService {
  urlbase = environment.host + '/ficha';

  constructor(private http: HttpClient) {}

  obterFichaPorId(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  obterFichas(): Observable<any> {
    return this.http.get(`${this.urlbase}`);
  }

  salvarFicha(ficha: any): Observable<any> {
    return this.http.post(`${this.urlbase}`, ficha);
  }
}
