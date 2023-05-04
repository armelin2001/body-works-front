import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { UsuarioDto } from '../../models/usuario-dto';

@Injectable()
export class UsuarioService {
  urlbase = environment.host + '/usuario';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.post(`${this.urlbase}`, usuario);
  }

  obterUsuario(id: string): Observable<any> {
    return this.http.get(`${this.urlbase}/${id}`);
  }

  atualizaUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.patch(`${this.urlbase}/${usuario.id}`, usuario);
  }
}
