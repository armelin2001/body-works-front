import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPresencaDTO } from '../../models/presenca.dto';

@Injectable()
export class PresencaService {
  urlbase = environment.host + '/usuario-presenca';

  constructor(private http: HttpClient) {}

  criarPresenca(presenca: IPresencaDTO): Observable<any> {
    return this.http.post(`${this.urlbase}`, presenca);
  }

  atualizarPresenca(
    presenca: IPresencaDTO,
    idPresenca: string
  ): Observable<any> {
    return this.http.patch(`${this.urlbase}/${idPresenca}`, presenca);
  }
}
